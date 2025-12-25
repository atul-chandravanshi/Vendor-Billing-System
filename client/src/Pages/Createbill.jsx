import { useContext, useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  X,
  User,
  Phone,
  Package,
} from "lucide-react";
import { userContext } from "../Context/Context";
import Navbar from "../Components/Navbar";

const CreateBill = () => {
  const { products } = useContext(userContext);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [kilogram, setKilogram] = useState("");
  const [gram, setGram] = useState("");
  const [billItems, setBillItems] = useState([]);
  const [customer, setCustomer] = useState({ name: "", phone: "" });

  const billNumber = `INV-${Date.now().toString().slice(-8)}`;
  const billDate = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const addItem = () => {
    const kg = parseFloat(kilogram) || 0;
    const g = parseFloat(gram) || 0;
    const totalQuantityInKg = kg + g / 1000;

    if (!selectedProduct || totalQuantityInKg <= 0) return;

    const product = products.find((p) => p._id === selectedProduct);
    if (!product) return;

    const total = product.price * totalQuantityInKg;

    setBillItems([
      ...billItems,
      {
        ...product,
        quantityInKg: totalQuantityInKg,
        total,
        billId: Date.now(),
      },
    ]);

    setSelectedProduct("");
    setKilogram("");
    setGram("");
  };

  const removeItem = (id) => {
    setBillItems(billItems.filter((item) => item.billId !== id));
  };

  const updateQuantity = (id, newQtyInKg) => {
    const qty = parseFloat(newQtyInKg);
    if (isNaN(qty) || qty <= 0) return;

    setBillItems(
      billItems.map((item) => {
        if (item.billId === id) {
          const updatedTotal = item.price * qty;
          return {
            ...item,
            quantityInKg: qty,
            total: updatedTotal,
          };
        }
        return item;
      })
    );
  };

  const clearBill = () => {
    setBillItems([]);
    setCustomer({ name: "", phone: "" });
  };

  const subtotal = billItems.reduce((sum, item) => sum + item.total, 0);

  const calculateGST = (amount) => {
    if (amount <= 500) return 0;
    if (amount <= 1000) return amount * 0.05;
    if (amount <= 2000) return amount * 0.18;
    return amount * 0.3;  
  };

  const gst = calculateGST(subtotal);
  const grandTotal = subtotal + gst;
  const gstPercent = subtotal > 0 ? ((gst / subtotal) * 100).toFixed(0) : 0;

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  const displayProductQuantity = (product) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <Navbar />

       
        <div className="mb-8 max-md:ml-10">
          <div className="flex items-center space-x-3 mb-2 ">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl  font-bold text-gray-800">
              Billing System
            </h1>
          </div>
          <p className="text-gray-600">Create and manage your invoices</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
       
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-600" />
                  Customer Details
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter customer name (Optional)"
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      value={customer.name}
                      onChange={(e) =>
                        setCustomer({ ...customer, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter phone number (Optional)"
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      value={customer.phone}
                      onChange={(e) =>
                        setCustomer({ ...customer, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

           
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Package className="w-5 h-5 text-purple-600" />
                  Add Product
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Product
                    </label>
                    <select
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="">Choose a product</option>
                      {products.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name} - ₹{p.price}/kg (Stock:{" "}
                          {displayProductQuantity(p)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
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
                          value={kilogram}
                          onChange={(e) => setKilogram(e.target.value)}
                          onKeyPress={handleKeyPress}
                          min="0"
                          step="0.001"
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
                          value={gram}
                          onChange={(e) => setGram(e.target.value)}
                          onKeyPress={handleKeyPress}
                          min="0"
                          max="999"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={addItem}
                  disabled={!selectedProduct || (!kilogram && !gram)}
                  className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add to Bill</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-4">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-purple-600">₹</span>
                  Bill Summary
                </h2>
              </div>

              <div className="p-6">
                {billItems.length > 0 ? (
                  <>
                    <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Bill No:</span>
                        <span className="font-semibold text-gray-800">
                          {billNumber}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-semibold text-gray-800">
                          {billDate}
                        </span>
                      </div>
                      {customer.name && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Customer:</span>
                          <span className="font-semibold text-gray-800">
                            {customer.name}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-gray-700">
                        <span>Subtotal:</span>
                        <span className="font-semibold">
                          ₹{subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>GST ({gstPercent}%):</span>
                        <span className="font-semibold">₹{gst.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-4 border-2 border-purple-200">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-800">
                          Grand Total:
                        </span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          ₹{grandTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={clearBill}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl py-3 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      Clear Bill
                    </button>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-gray-500 text-lg font-medium">
                      No items in bill
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Add products to get started
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        
        {billItems.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Bill Items</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Price/Kg
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Quantity (Kg)
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {billItems.map((item) => (
                    <tr
                      key={item.billId}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-purple-600" />
                          </div>
                          <span className="font-semibold text-gray-800">
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-800 font-semibold">
                          ₹{item.price}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <input
                            type="number"
                            value={item.quantityInKg}
                            onChange={(e) =>
                              updateQuantity(item.billId, e.target.value)
                            }
                            className="w-24 px-3 py-2 border-2 border-gray-200 rounded-lg text-center focus:border-purple-500 focus:outline-none transition-colors"
                            min="0.001"
                            step="0.001"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-semibold text-gray-800">
                          ₹{item.total.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() => removeItem(item.billId)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="Remove item"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBill;
