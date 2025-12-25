import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { userContext } from "../Context/Context";
import Navbar from "../Components/Navbar";
import { Package, Edit2, Trash2, X, Plus, Search } from "lucide-react";

const Products = () => {
  const { products, setProducts, user } = useContext(userContext);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: {
      kilogram: "",
      gram: "",
    },
    userId: user._id,
  });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (field, value) => {
    setFormData({
      ...formData,
      quantity: {
        ...formData.quantity,
        [field]: value,
      },
    });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("Product name is Required");
      return;
    } else if (!formData.price) {
      toast.error("Price is Required");
      return;
    } else if (!formData.quantity.kilogram && !formData.quantity.gram) {
      toast.error("Quantity is Required");
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        quantity: {
          kilogram: parseFloat(formData.quantity.kilogram) || 0,
          gram: parseFloat(formData.quantity.gram) || 0,
        },
      };

      if (editId) {
        
        const response = await axios.put(
          `http://localhost:8000/product/update-product/${editId}`,
          dataToSend,
          { withCredentials: true }
        );

      
        setProducts(
          products.map((product) =>
            product._id === editId ? response.data : product
          )
        );

        toast.success("Product updated successfully!");
        setEditId(null);
      } else {
   
        const response = await axios.post(
          "http://localhost:8000/product/create-product",
          dataToSend,
          { withCredentials: true }
        );

     
        setProducts([...products, response.data]);
        toast.success("Product added successfully!");
      }

     
      setFormData({
        name: "",
        price: "",
        quantity: {
          kilogram: "",
          gram: "",
        },
        userId: user._id,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      quantity: {
        kilogram: product.quantity?.kilogram || "",
        gram: product.quantity?.gram || "",
      },
      userId: user._id,
    });
    setEditId(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8000/product/delete-product/${productId}`,
        { withCredentials: true }
      );

      
      setProducts(products.filter((product) => product._id !== productId));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product!");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      price: "",
      quantity: {
        kilogram: "",
        gram: "",
      },
      userId: user._id,
    });
    setEditId(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/product/get-products",
          { withCredentials: true }
        );
        setProducts(response.data);
      } catch (error) {
        toast.error("Failed to fetch products!");
      }
    };
    fetchProducts();
  }, []);

  
  const displayQuantity = (product) => {
    const kg = product.quantity?.kilogram || 0;
    const g = product.quantity?.gram || 0;
    if (kg > 0 && g > 0) {
      return `${kg} kg ${g} g`;
    } else if (kg > 0) {
      return `${kg} kg`;
    } else if (g > 0) {
      return `${g} g`;
    }
    return "0";
  };


  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <Navbar />

        
        <div className="mb-8 max-md:ml-9">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              <h1 className="max-md:ml-10"> Product </h1>Management
            </h1>
          </div>
          <p className="text-gray-600 ml-1 max-md:ml-4">
            Add, edit, and manage your inventory
          </p>
        </div>

       
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {editId ? "Edit Product" : "Add New Product"}
            </h2>
            {editId && (
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <form onSubmit={handleAddOrUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

            
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Quantity
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Kilogram (kg)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    value={formData.quantity.kilogram}
                    onChange={(e) =>
                      handleQuantityChange("kilogram", e.target.value)
                    }
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Gram (g)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    value={formData.quantity.gram}
                    onChange={(e) =>
                      handleQuantityChange("gram", e.target.value)
                    }
                    min="0"
                    max="999"
                  />
                </div>
              </div>
            </div>

       
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {editId ? (
                  <>
                    <Edit2 className="w-5 h-5" />
                    <span>Update Product</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Add Product</span>
                  </>
                )}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-8 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

      
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
         
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Product Inventory
              </h2>
              <div className="text-sm text-gray-600">
                Total:{" "}
                <span className="font-bold text-purple-600">
                  {products.length}
                </span>{" "}
                products
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">
                        {searchTerm
                          ? "No products found"
                          : "No products added yet"}
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        {searchTerm
                          ? "Try a different search term"
                          : "Add your first product to get started"}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-purple-600" />
                          </div>
                          <span className="font-medium text-gray-800">
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-800 font-semibold">
                          ₹ {item.price}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {displayQuantity(item)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
