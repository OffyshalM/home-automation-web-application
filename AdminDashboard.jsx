import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  LayoutDashboard,
  FileText,
  ChevronRight,
  LogOut,
  Search,
  Edit2,
  Trash2,
  Menu,
  X,
  RefreshCw,
  Bell,
  User,
  Settings,
  Mail,
  Phone,
  Eye,
  Check,
  XCircle,
  Inbox,
  Sun,
  Moon,
  AlertTriangle,
  Image as ImageIcon,
  Upload,
  Loader2,
  Video,
  Music,
  Plus,
  Calendar,
} from "lucide-react";
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");

  const [deletingId, setDeletingId] = useState(null);
  const [deletingProjectId, setDeletingProjectId] = useState(null);

  const [submissions, setSubmissions] = useState([]);
  const [adminEmail, setAdminEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState("requests");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [viewingItem, setViewingItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // ---- PROJECTS STATE ----
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectBody, setProjectBody] = useState("");
  const [projectFiles, setProjectFiles] = useState([]);
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);
  const [projectError, setProjectError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateSuccess, setShowCreateSuccess] = useState(false);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://futuricaautomations.com/api/get-submissions.php",
        { withCredentials: true }
      );
      if (response.data.success) {
        setSubmissions(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch submissions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const response = await axios.get(
        "https://futuricaautomations.com/api/get-projects.php"
      );
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    fetchProjects();
    axios
      .get("https://futuricaautomations.com/api/check-session.php", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.adminEmail) setAdminEmail(res.data.adminEmail);
      })
      .catch((err) => console.error("Session check failed:", err));
  }, []);

  const confirmLogout = async () => {
    try {
      await axios.post(
        "https://futuricaautomations.com/api/logout.php",
        {},
        { withCredentials: true }
      );
    } finally {
      navigate("/admin/login");
    }
  };

  const handleDelete = (id) => {
    setDeletingId(id);
  };

  const confirmDeleteSubmission = async () => {
    if (!deletingId) return;

    try {
      const response = await axios.post(
        "https://futuricaautomations.com/api/delete-submission.php",
        { id: deletingId },
        { withCredentials: true }
      );

      if (response.data.success) {
        setSubmissions((prev) => prev.filter((item) => item.id !== deletingId));
      } else {
        alert("Failed to delete submission: " + response.data.error);
      }
    } catch (err) {
      console.error("Error deleting submission:", err);
      alert("An error occurred while deleting the submission.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setSubmissions((prev) =>
      prev.map((item) => (item.id === editingItem.id ? editingItem : item))
    );
    setEditingItem(null);
  };

  const filteredSubmissions = submissions.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      (s.full_name && s.full_name.toLowerCase().includes(term)) ||
      (s.email && s.email.toLowerCase().includes(term)) ||
      (s.product && s.product.toLowerCase().includes(term)) ||
      (s.status && s.status.toLowerCase().includes(term)) ||
      (s.whatsapp_number && s.whatsapp_number.includes(term))
    );
  });

  // ---- PROJECTS HANDLERS ----
  const handleProjectFileChange = (e) => {
    setProjectFiles([...e.target.files]);
  };

  const removeProjectFile = (index) => {
    setProjectFiles(projectFiles.filter((_, i) => i !== index));
  };

  const resetProjectForm = () => {
    setProjectTitle("");
    setProjectBody("");
    setProjectFiles([]);
    setProjectError("");
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setProjectError("");

    if (!projectTitle.trim() || !projectBody.trim()) {
      setProjectError("Title and body are required.");
      return;
    }

    setIsSubmittingProject(true);

    const formData = new FormData();
    formData.append("title", projectTitle);
    formData.append("body", projectBody);
    projectFiles.forEach((file) => {
      formData.append("media[]", file);
    });

    try {
      const response = await axios.post(
        "https://futuricaautomations.com/api/create-project.php",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        resetProjectForm();
        fetchProjects();
        setShowCreateSuccess(true);
        setTimeout(() => {
          setShowCreateSuccess(false);
          setShowCreateModal(false);
        }, 1500);
      } else {
        setProjectError(response.data.error || "Failed to create project.");
      }
    } catch (err) {
      setProjectError("Failed to create project. Please try again.");
    } finally {
      setIsSubmittingProject(false);
    }
  };

  const handleDeleteProject = (id) => {
    setDeletingProjectId(id);
  };

  const confirmDeleteProject = async () => {
    if (!deletingProjectId) return;

    try {
      await axios.post(
        "https://futuricaautomations.com/api/delete-project.php",
        { id: deletingProjectId },
        { withCredentials: true }
      );
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("An error occurred while deleting the project.");
    } finally {
      setDeletingProjectId(null);
    }
  };

  const theme = {
    bg: isDarkMode ? "bg-slate-900" : "bg-slate-100",
    textPrimary: isDarkMode ? "text-white" : "text-slate-900",
    textSecondary: isDarkMode ? "text-slate-400" : "text-slate-600",
    sidebarBg: isDarkMode ? "bg-slate-950" : "bg-white",
    topbarBg: isDarkMode ? "bg-slate-950" : "bg-white",
    cardBg: isDarkMode ? "bg-slate-950" : "bg-white",
    border: isDarkMode ? "border-slate-800" : "border-slate-200",
    tableHeaderBg: isDarkMode ? "bg-slate-900" : "bg-slate-50",
    hoverBg: isDarkMode ? "hover:bg-slate-900" : "hover:bg-slate-50",
    inputBg: isDarkMode ? "bg-slate-900" : "bg-slate-50",
    modalBg: isDarkMode ? "bg-slate-950" : "bg-white",
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.textPrimary} font-sans relative overflow-x-hidden`}>

      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 ${theme.sidebarBg} ${theme.border} border-r transition-all duration-300 flex flex-col justify-between
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isSidebarOpen ? "w-64" : "w-20"} h-screen`}
      >
        <div>
          <div className={`h-20 flex items-center justify-between px-5 ${theme.border} border-b`}>
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="text-brand-black" />
              </div>
              {isSidebarOpen && (
                <span className={`font-bold text-base tracking-tight ${theme.textPrimary} truncate`}>
                  Futurica <span className="text-brand-gold">Admin</span>
                </span>
              )}
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`hidden lg:block ${theme.textSecondary} hover:${theme.textPrimary} p-1`}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button
              onClick={() => setIsMobileOpen(false)}
              className={`lg:hidden ${theme.textSecondary} hover:${theme.textPrimary} p-1`}
            >
              <X size={20} />
            </button>
          </div>

          <nav className="p-4 flex flex-col gap-2 overflow-y-auto">
            <button
              onClick={() => setCurrentView("dashboard")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                currentView === "dashboard"
                  ? "bg-brand-gold text-brand-black shadow-sm"
                  : `${theme.textSecondary} ${theme.hoverBg}`
              }`}
            >
              <LayoutDashboard size={18} />
              {isSidebarOpen && <span>Dashboard</span>}
            </button>

            <div>
              <button
                onClick={() => setOpenSubmenu(openSubmenu === "requests" ? "" : "requests")}
                className={`flex items-center justify-between w-full px-4 py-3 ${theme.textSecondary} ${theme.hoverBg} rounded-xl text-sm transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} />
                  {isSidebarOpen && <span>Quote Requests</span>}
                </div>
                {isSidebarOpen && (
                  <ChevronRight
                    size={16}
                    className={`transition-transform duration-300 ${
                      openSubmenu === "requests" ? "rotate-90" : "rotate-0"
                    }`}
                  />
                )}
              </button>

              {isSidebarOpen && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openSubmenu === "requests"
                      ? "max-h-40 opacity-100 py-2"
                      : "max-h-0 opacity-0 py-0"
                  }`}
                >
                  <div className="pl-11 pr-4 flex flex-col gap-2 text-xs">
                    <button
                      onClick={() => setCurrentView("dashboard")}
                      className={`text-left py-1 ${theme.textSecondary} hover:text-brand-gold transition-colors`}
                    >
                      All Submissions ({submissions.length})
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setCurrentView("projects")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                currentView === "projects"
                  ? "bg-brand-gold text-brand-black shadow-sm"
                  : `${theme.textSecondary} ${theme.hoverBg}`
              }`}
            >
              <ImageIcon size={18} />
              {isSidebarOpen && <span>Projects ({projects.length})</span>}
            </button>
          </nav>
        </div>

        <div className={`p-4 ${theme.border} border-t`}>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={`flex items-center gap-3 w-full px-4 py-3 ${theme.textSecondary} hover:text-red-500 ${theme.hoverBg} rounded-xl text-sm transition-colors`}
          >
            <LogOut size={18} />
            {isSidebarOpen && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* TOPBAR */}
      <header
        className={`fixed top-0 right-0 z-30 h-20 ${theme.topbarBg} ${theme.border} border-b px-4 sm:px-8 flex items-center justify-between transition-all duration-300 left-0 ${
          isSidebarOpen ? "lg:left-64" : "lg:left-20"
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(true)}
            className={`lg:hidden p-2 rounded-lg ${theme.hoverBg} ${theme.textSecondary}`}
          >
            <Menu size={20} />
          </button>
          <button
            onClick={currentView === "dashboard" ? fetchSubmissions : fetchProjects}
            disabled={currentView === "dashboard" ? isLoading : isLoadingProjects}
            className="bg-brand-gold/10 text-brand-gold border border-brand-gold/20 hover:bg-brand-gold/20 px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw
              size={14}
              className={(currentView === "dashboard" ? isLoading : isLoadingProjects) ? "animate-spin" : ""}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl ${theme.hoverBg} ${theme.textSecondary} hover:${theme.textPrimary} transition-colors`}
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-700" />}
          </button>

          <button className={`${theme.textSecondary} hover:${theme.textPrimary} relative p-2`}>
            <Bell size={20} />
            <span className="w-2 h-2 bg-brand-gold rounded-full absolute top-1 right-1"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-9 h-9 rounded-full bg-brand-gold text-brand-black font-bold flex items-center justify-center text-sm border-2 border-brand-gold shrink-0"
            >
              {adminEmail ? adminEmail.charAt(0).toUpperCase() : "A"}
            </button>

            {showProfileMenu && (
              <div className={`absolute right-0 mt-3 w-56 ${theme.modalBg} ${theme.border} border rounded-xl shadow-2xl p-3 z-50`}>
                <p className="text-xs font-semibold text-slate-400 uppercase px-3 py-1">Logged In As</p>
                <p className={`text-sm font-bold ${theme.textPrimary} px-3 mb-2 truncate`}>{adminEmail || "Admin"}</p>
                <hr className={`${theme.border} my-2`} />
                <button className={`flex items-center gap-2 w-full text-left px-3 py-2 text-xs ${theme.textSecondary} ${theme.hoverBg} rounded-lg`}>
                  <User size={14} /> Account Settings
                </button>
                <button className={`flex items-center gap-2 w-full text-left px-3 py-2 text-xs ${theme.textSecondary} ${theme.hoverBg} rounded-lg`}>
                  <Settings size={14} /> System Preferences
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    setShowLogoutConfirm(true);
                  }}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 text-xs text-red-500 ${theme.hoverBg} rounded-lg mt-1`}
                >
                  <LogOut size={14} /> Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className={`min-h-screen transition-all duration-300 pt-20 flex flex-col ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6 sm:space-y-8 flex-1">

          {currentView === "dashboard" ? (
            <>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-extrabold ${theme.textPrimary} tracking-tight`}>System Overview</h1>
                <p className={`text-xs sm:text-sm ${theme.textSecondary} mt-1`}>Real-time administration management portal.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className={`${theme.cardBg} ${theme.border} border p-5 sm:p-6 rounded-2xl flex items-center gap-5 shadow-sm`}>
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                    <Inbox size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400">Total Requests</p>
                    <h3 className={`text-2xl font-black ${theme.textPrimary}`}>{submissions.length}</h3>
                    <p className={`text-xs ${theme.textSecondary} mt-1`}>Received submissions</p>
                  </div>
                </div>

                <div className={`${theme.cardBg} ${theme.border} border p-5 sm:p-6 rounded-2xl flex items-center gap-5 shadow-sm`}>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400">System Status</p>
                    <h3 className={`text-2xl font-black ${theme.textPrimary}`}>Active</h3>
                    <p className="text-xs text-emerald-500 mt-1">● Database Connected</p>
                  </div>
                </div>

                <div className={`${theme.cardBg} ${theme.border} border p-5 sm:p-6 rounded-2xl flex items-center gap-5 shadow-sm sm:col-span-2 lg:col-span-1`}>
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                    <User size={24} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400">Administrator</p>
                    <h3 className={`text-lg font-bold ${theme.textPrimary} truncate`}>
                      {adminEmail ? adminEmail.split("@")[0] : "Admin"}
                    </h3>
                    <p className={`text-xs ${theme.textSecondary} mt-1`}>Authenticated Session</p>
                  </div>
                </div>
              </div>

              <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-4 sm:p-6 shadow-sm`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h2 className={`text-lg font-bold ${theme.textPrimary}`}>Recent Quote Submissions</h2>
                    <p className={`text-xs ${theme.textSecondary}`}>View, search, update, or remove customer requests.</p>
                  </div>

                  <div className="relative w-full md:w-72">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by name, email, product..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full ${theme.inputBg} ${theme.border} border rounded-xl pl-9 pr-4 py-2 text-xs ${theme.textPrimary} focus:outline-none focus:border-brand-gold transition-colors`}
                    />
                  </div>
                </div>

                {isLoading ? (
                  <div className={`py-12 text-center ${theme.textSecondary} text-sm`}>Loading submissions...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className={`${theme.tableHeaderBg} ${theme.border} border-b ${theme.textSecondary} uppercase tracking-wider`}>
                        <tr>
                          <th className="p-4">Customer Name</th>
                          <th className="p-4">Contact Info</th>
                          <th className="p-4">Product / Service</th>
                          <th className="p-4 min-w-[150px]">Message</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Date</th>
                          <th className="p-4 text-center">Operations</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${theme.border}`}>
                        {filteredSubmissions.length > 0 ? (
                          filteredSubmissions.map((s) => (
                            <tr key={s.id} className={`${theme.hoverBg} transition-colors`}>
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-brand-gold/20 text-brand-gold font-bold flex items-center justify-center shrink-0">
                                    {s.full_name ? s.full_name.substring(0, 2).toUpperCase() : "CU"}
                                  </div>
                                  <p className={`font-bold ${theme.textPrimary} text-sm whitespace-nowrap`}>{s.full_name}</p>
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <Mail size={12} className="text-brand-gold shrink-0" />
                                  <span className={theme.textPrimary}>{s.email}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Phone size={12} className="text-brand-gold shrink-0" />
                                  <span className={theme.textSecondary}>{s.whatsapp_number}</span>
                                </div>
                              </td>
                              <td className={`p-4 font-semibold ${theme.textPrimary} whitespace-nowrap`}>{s.product}</td>
                              <td className={`p-4 ${theme.textSecondary} max-w-xs truncate`}>{s.message}</td>
                              <td className="p-4 whitespace-nowrap">
                                <span
                                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    s.status === "pending" || s.status === "Pending"
                                      ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                      : s.status === "completed" || s.status === "Completed"
                                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                      : "bg-brand-gold/10 text-brand-gold border border-brand-gold/20"
                                  }`}
                                >
                                  {s.status || "Pending"}
                                </span>
                              </td>
                              <td className={`p-4 ${theme.textSecondary} text-[11px] whitespace-nowrap`}>
                                {s.created_at ? new Date(s.created_at).toLocaleDateString() : "N/A"}
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => setViewingItem(s)}
                                    className={`p-2 ${theme.inputBg} hover:bg-brand-gold hover:text-brand-black ${theme.textSecondary} rounded-lg transition-colors`}
                                    title="View Details"
                                  >
                                    <Eye size={14} />
                                  </button>
                                  <button
                                    onClick={() => setEditingItem({ ...s })}
                                    className={`p-2 ${theme.inputBg} hover:bg-brand-gold hover:text-brand-black ${theme.textSecondary} rounded-lg transition-colors`}
                                    title="Edit Submission"
                                  >
                                    <Edit2 size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(s.id)}
                                    className={`p-2 ${theme.inputBg} hover:bg-red-500 hover:text-white ${theme.textSecondary} rounded-lg transition-colors`}
                                    title="Delete Record"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className={`text-center p-8 ${theme.textSecondary}`}>
                              No submissions match your query.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className={`text-2xl sm:text-3xl font-extrabold ${theme.textPrimary} tracking-tight`}>Projects</h1>
                  <p className={`text-xs sm:text-sm ${theme.textSecondary} mt-1`}>Publish new projects and manage what appears on the public site.</p>
                </div>
                <button
                  onClick={() => {
                    resetProjectForm();
                    setShowCreateModal(true);
                  }}
                  className="flex items-center gap-2 bg-brand-gold text-brand-black font-semibold text-sm px-5 py-2.5 rounded-xl uppercase tracking-wider hover:brightness-95 transition-all shrink-0"
                >
                  <Plus size={16} />
                  Create Project
                </button>
              </div>

              {/* PROJECTS LIST */}
              <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-5 sm:p-6 shadow-sm`}>
                <h2 className={`text-lg font-bold ${theme.textPrimary} mb-5`}>Published Projects ({projects.length})</h2>

                {isLoadingProjects ? (
                  <div className={`py-12 text-center ${theme.textSecondary} text-sm`}>Loading projects...</div>
                ) : projects.length === 0 ? (
                  <div className={`py-12 text-center ${theme.textSecondary} text-sm`}>No projects published yet.</div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className={`${theme.inputBg} ${theme.border} border rounded-xl p-4 sm:p-5 flex items-start justify-between gap-4`}
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold ${theme.textPrimary} mb-1`}>{project.title}</h3>
                          <p className={`text-sm ${theme.textSecondary} line-clamp-2 mb-2`}>{project.body}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(project.created_at).toLocaleDateString()}
                            </span>
                            {project.media && project.media.length > 0 && (
                              <span className="flex items-center gap-1">
                                {project.media.some((m) => m.file_type === "image") && <ImageIcon size={12} />}
                                {project.media.some((m) => m.file_type === "video") && <Video size={12} />}
                                {project.media.some((m) => m.file_type === "audio") && <Music size={12} />}
                                {project.media.length} file{project.media.length !== 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className={`p-2 ${theme.cardBg} hover:bg-red-500 hover:text-white ${theme.textSecondary} rounded-lg transition-colors shrink-0`}
                          title="Delete Project"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

        </main>
      </div>

      {/* CREATE PROJECT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className={`${theme.modalBg} ${theme.border} border rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto`}>

            {showCreateSuccess ? (
              <div className="flex flex-col items-center text-center py-10">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Check size={32} className="text-emerald-500" />
                </div>
                <h3 className={`text-lg font-bold ${theme.textPrimary} mb-1`}>Created Successfully</h3>
                <p className={`text-xs ${theme.textSecondary}`}>Returning to your project list...</p>
              </div>
            ) : (
              <>
                <div className={`flex justify-between items-center ${theme.border} border-b pb-3 mb-5`}>
                  <h3 className={`text-lg font-bold ${theme.textPrimary}`}>Create New Project</h3>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className={`${theme.textSecondary} hover:${theme.textPrimary}`}
                  >
                    <XCircle size={18} />
                  </button>
                </div>

                {projectError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs px-4 py-3 rounded-xl mb-5">
                    {projectError}
                  </div>
                )}

                <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
                  <div>
                    <label className={`block text-xs font-medium ${theme.textSecondary} mb-1`}>Title</label>
                    <input
                      type="text"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      className={`w-full ${theme.inputBg} ${theme.border} border rounded-xl px-4 py-2.5 text-sm ${theme.textPrimary} focus:outline-none focus:border-brand-gold transition-colors`}
                      placeholder="e.g. Smart Villa Automation, Lekki"
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-medium ${theme.textSecondary} mb-1`}>Body</label>
                    <textarea
                      rows="5"
                      value={projectBody}
                      onChange={(e) => setProjectBody(e.target.value)}
                      className={`w-full ${theme.inputBg} ${theme.border} border rounded-xl px-4 py-2.5 text-sm ${theme.textPrimary} focus:outline-none focus:border-brand-gold transition-colors resize-none`}
                      placeholder="Describe the project..."
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-medium ${theme.textSecondary} mb-2`}>Photos / Videos / Audio</label>
                    <label className={`flex items-center justify-center gap-2 border-2 border-dashed ${theme.border} rounded-xl py-8 cursor-pointer hover:border-brand-gold transition-colors`}>
                      <Upload size={18} className="text-slate-400" />
                      <span className={`text-sm ${theme.textSecondary}`}>Click to upload files</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*,audio/*"
                        onChange={handleProjectFileChange}
                        className="hidden"
                      />
                    </label>

                    {projectFiles.length > 0 && (
                      <ul className="mt-3 flex flex-col gap-2">
                        {projectFiles.map((file, index) => (
                          <li
                            key={index}
                            className={`flex items-center justify-between ${theme.inputBg} rounded-lg px-4 py-2 text-xs ${theme.textPrimary}`}
                          >
                            <span className="truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeProjectFile(index)}
                              className="text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingProject}
                    className="flex items-center justify-center gap-2 bg-brand-gold text-brand-black font-semibold text-sm py-3 rounded-xl uppercase tracking-wider hover:brightness-95 transition-all disabled:opacity-60 mt-1"
                  >
                    {isSubmittingProject && <Loader2 size={16} className="animate-spin" />}
                    {isSubmittingProject ? "Publishing..." : "Publish Project"}
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      )}

      {/* CUSTOM DELETE PROJECT CONFIRMATION MODAL */}
      {deletingProjectId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className={`${theme.modalBg} ${theme.border} border rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4`}>
            <div className="flex items-center gap-3 text-red-500">
              <AlertTriangle size={24} />
              <h3 className={`text-lg font-bold ${theme.textPrimary}`}>Delete Project</h3>
            </div>
            <p className={`text-xs ${theme.textSecondary}`}>
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeletingProjectId(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${theme.textSecondary} ${theme.hoverBg}`}
              >
                No
              </button>
              <button
                onClick={confirmDeleteProject}
                className="px-4 py-2 rounded-xl text-xs bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOGOUT CONFIRM MODAL */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className={`${theme.modalBg} ${theme.border} border rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4`}>
            <div className="flex items-center gap-3 text-amber-500">
              <AlertTriangle size={24} />
              <h3 className={`text-lg font-bold ${theme.textPrimary}`}>Confirm Logout</h3>
            </div>
            <p className={`text-xs ${theme.textSecondary}`}>
              Are you sure you want to end your current administrative session?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className={`px-4 py-2 rounded-xl text-xs ${theme.textSecondary} ${theme.hoverBg}`}
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-xl text-xs bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM DELETE SUBMISSION CONFIRMATION MODAL */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className={`${theme.modalBg} ${theme.border} border rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4`}>
            <div className="flex items-center gap-3 text-red-500">
              <AlertTriangle size={24} />
              <h3 className={`text-lg font-bold ${theme.textPrimary}`}>Delete Submission</h3>
            </div>
            <p className={`text-xs ${theme.textSecondary}`}>
              Are you sure you want to delete this submission? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${theme.textSecondary} ${theme.hoverBg}`}
              >
                No
              </button>
              <button
                onClick={confirmDeleteSubmission}
                className="px-4 py-2 rounded-xl text-xs bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {viewingItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className={`${theme.modalBg} ${theme.border} border rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4`}>
            <div className={`flex justify-between items-center ${theme.border} border-b pb-3`}>
              <h3 className={`text-lg font-bold ${theme.textPrimary}`}>Submission Details</h3>
              <button onClick={() => setViewingItem(null)} className={`${theme.textSecondary} hover:${theme.textPrimary}`}>
                <XCircle size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-slate-400 uppercase font-bold text-[10px]">Customer Name</p>
                <p className={`text-sm font-semibold ${theme.textPrimary}`}>{viewingItem.full_name}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 uppercase font-bold text-[10px]">Email Address</p>
                  <p className={theme.textPrimary}>{viewingItem.email}</p>
                </div>
                <div>
                  <p className="text-slate-400 uppercase font-bold text-[10px]">WhatsApp / Phone</p>
                  <p className={theme.textPrimary}>{viewingItem.whatsapp_number}</p>
                </div>
              </div>

              <div>
                <p className="text-slate-400 uppercase font-bold text-[10px]">Requested Product</p>
                <p className="text-brand-gold font-semibold text-sm">{viewingItem.product}</p>
              </div>

              <div>
                <p className="text-slate-400 uppercase font-bold text-[10px]">Full Message</p>
                <div className={`p-3 ${theme.inputBg} ${theme.border} border rounded-xl mt-1 ${theme.textPrimary} whitespace-pre-wrap`}>
                  {viewingItem.message || "No message provided."}
                </div>
              </div>
            </div>

            <div className={`flex justify-end pt-2 ${theme.border} border-t`}>
              <button
                onClick={() => setViewingItem(null)}
                className={`px-4 py-2 ${theme.inputBg} ${theme.textPrimary} rounded-xl text-xs font-semibold`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT SUBMISSION MODAL */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className={`${theme.modalBg} ${theme.border} border rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-5`}>
            <div className={`flex justify-between items-center ${theme.border} border-b pb-3`}>
              <h3 className={`text-lg font-bold ${theme.textPrimary}`}>Edit Submission</h3>
              <button onClick={() => setEditingItem(null)} className={`${theme.textSecondary} hover:${theme.textPrimary}`}>
                <XCircle size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingItem.full_name || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, full_name: e.target.value })}
                  className={`w-full ${theme.inputBg} ${theme.border} border rounded-xl px-3 py-2 text-xs ${theme.textPrimary} focus:outline-none focus:border-brand-gold`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={editingItem.email || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
                  className={`w-full ${theme.inputBg} ${theme.border} border rounded-xl px-3 py-2 text-xs ${theme.textPrimary} focus:outline-none focus:border-brand-gold`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">WhatsApp / Phone</label>
                <input
                  type="text"
                  value={editingItem.whatsapp_number || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, whatsapp_number: e.target.value })}
                  className={`w-full ${theme.inputBg} ${theme.border} border rounded-xl px-3 py-2 text-xs ${theme.textPrimary} focus:outline-none focus:border-brand-gold`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Status</label>
                <select
                  value={editingItem.status || "Pending"}
                  onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                  className={`w-full ${theme.inputBg} ${theme.border} border rounded-xl px-3 py-2 text-xs ${theme.textPrimary} focus:outline-none focus:border-brand-gold`}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Review">In Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className={`flex justify-end gap-3 pt-3 ${theme.border} border-t`}>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className={`px-4 py-2 rounded-xl text-xs ${theme.textSecondary} ${theme.hoverBg}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs bg-brand-gold text-brand-black font-bold flex items-center gap-1"
                >
                  <Check size={14} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}