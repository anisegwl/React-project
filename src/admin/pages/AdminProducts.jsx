import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EditProductModal from "../components/EditProduct.jsx";
import AddProduct from "../components/AddProduct";
import { FaEdit, FaTrash, FaBox, FaExclamationTriangle } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const defaultImage = "https://via.placeholder.com/100x100.png?text=No+Image";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_BASE}/api/products`, {
        timeout: 10000,
      });

      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);

      if (error.code === "ECONNABORTED") {
        setError("Request timeout. Please try again.");
      } else if (error.response) {
        setError(
          `Server error: ${error.response.data?.message || "Failed to fetch products"}`
        );
      } else if (error.request) {
        setError("Cannot connect to server. Please check your connection.");
      } else {
        setError("An unexpected error occurred while fetching products.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setDeleteLoading(id);

    try {
      const token = localStorage.getItem("token"); // ✅ FIXED
      if (!token) {
        toast.error("❌ Token missing. Login again.");
        return;
      }

      await axios.delete(`${API_BASE}/api/products/${id}`, {
        headers: { "auth-token": token },
        timeout: 10000,
      });

      toast.success("✅ Product deleted");
      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);

      const msg =
        error?.response?.data?.message ||
        (error?.response?.status === 401 ? "Invalid token (login again)" : "") ||
        "Failed to delete product";

      toast.error(`❌ ${msg}`);
    } finally {
      setDeleteLoading(null);
    }
  };

  // IMPORTANT: throw error so modal can keep open
  const handleUpdate = async (updatedData) => {
    try {
      const token = localStorage.getItem("token"); // ✅ FIXED
      if (!token) throw new Error("Token missing. Login again.");

      await axios.put(
        `${API_BASE}/api/products/${editingProduct._id}`,
        updatedData,
        {
          headers: {
            "auth-token": token,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      toast.success("✅ Product updated");
      await fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);

      const msg =
        error?.response?.data?.message ||
        (error?.response?.status === 401 ? "Invalid token (login again)" : "") ||
        "Failed to update product";

      toast.error(`❌ ${msg}`);

      // Throw so modal can show error (if you use my improved modal)
      throw new Error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <AddProduct onSuccess={fetchProducts} />
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-800 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Manage Products</h2>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6">
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="text-red-500 text-xl flex-shrink-0" />
                <div className="flex-grow">
                  <p className="text-red-700 font-medium">Error Loading Products</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
                <button
                  onClick={fetchProducts}
                  className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading products...</p>
              </div>
            </div>
          ) : products.length === 0 && !error ? (
            <div className="text-center py-20">
              <FaBox className="text-gray-300 text-6xl mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No products found</p>
              <p className="text-gray-400 text-sm mt-2">Add your first product to get started</p>
            </div>
          ) : !error ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <img
                          src={
                            product.image?.length
                              ? `${API_BASE}${product.image[0]}`
                              : defaultImage
                          }
                          alt={product.title}
                          onError={(e) => (e.currentTarget.src = defaultImage)}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">
                          {product.title}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-900">
                          Rs {product.price}
                        </p>
                        {Number(product.discount) > 0 && (
                          <span className="text-xs text-green-600 font-medium">
                            -{product.discount} Rs off
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            product.instock > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.instock > 0 ? `${product.instock} in stock` : "Out of stock"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md"
                          >
                            <FaEdit />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(product._id)}
                            disabled={deleteLoading === product._id}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md ${
                              deleteLoading === product._id
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700 text-white"
                            }`}
                          >
                            {deleteLoading === product._id ? "Deleting..." : (
                              <>
                                <FaTrash />
                                Delete
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>

        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSave={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
