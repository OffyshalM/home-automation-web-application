import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import axios from "axios";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://futuricaautomations.com/api/login.php",
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        navigate("/admin/dashboard");
      } else {
        setError(response.data.error || "Invalid credentials.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Unable to log in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6 font-sans">
      <div className="max-w-md w-full">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-full bg-brand-gold flex items-center justify-center">
            <ShieldCheck size={22} className="text-brand-black" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Futurica Automations</p>
            <p className="text-gray-400 text-xs">Admin Panel</p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl">
          <h1 className="text-2xl font-bold text-brand-black mb-2">Admin Login</h1>
          <p className="text-sm text-gray-500 mb-8">
            Sign in to the administration panel.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 mb-6 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-brand-black mb-1">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-lg"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-black mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-200 pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-lg"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-brand-gold text-brand-black font-semibold py-3.5 uppercase tracking-wider hover:bg-brand-blue hover:text-white transition-colors disabled:opacity-60 mt-2 rounded-lg cursor-pointer"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}