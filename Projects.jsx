import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, ArrowLeft } from "lucide-react";

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://futuricaautomations.com/api/get-projects.php", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          setProjects(response.data.data);
        }
      })
      .catch((err) => console.error("Failed to fetch projects:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="bg-slate-50 pt-28 sm:pt-32 pb-16 md:pb-24 font-sans min-h-screen relative overflow-hidden">
      
      {/* BACKGROUND DECORATIVE ACCENTS */}
      <div className="absolute top-0 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 sm:w-80 sm:h-80 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        {/* BACK TO HOME LINK */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-blue hover:text-brand-black transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>

        {/* HEADER SECTION */}
        <div className="mb-10 sm:mb-12 text-center">
          <span className="inline-block text-[11px] sm:text-xs font-bold text-brand-blue bg-brand-gold/20 border border-brand-gold px-3.5 py-1.5 rounded-full mb-3 sm:mb-4 shadow-sm uppercase tracking-widest">
            <span className="text-brand-black">Our</span>{" "}
            <span className="text-brand-blue">Projects</span>
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black mb-3 sm:mb-4 tracking-tight leading-tight">
            Recent Installations
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A look at some of the automation projects we have delivered for homes and businesses.
          </p>
        </div>

        {/* CONTENT SECTION */}
        {isLoading ? (
          <p className="text-center text-sm sm:text-base text-gray-500 font-medium py-12">
            Loading projects...
          </p>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-dashed border-gray-200 max-w-lg mx-auto px-4 shadow-sm">
            <p className="text-sm sm:text-base text-gray-500 font-medium">
              No projects have been posted yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8 sm:gap-10">
            {projects.map((project) => (
              <article
                key={project.id}
                className="bg-white border border-gray-200/80 hover:border-brand-gold/50 rounded-2xl p-5 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-brand-blue/80 mb-3 bg-brand-blue/5 w-fit px-3 py-1 rounded-full border border-brand-blue/10">
                  <Calendar size={13} className="text-brand-blue" />
                  <span>
                    {new Date(project.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <h2 className="text-lg sm:text-2xl font-bold text-brand-black mb-3 sm:mb-4 hover:text-brand-blue transition-colors">
                  {project.title}
                </h2>

                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-line mb-6">
                  {project.body}
                </p>

                {project.media && project.media.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.media.map((file, index) => {
                      const fileUrl = `https://futuricaautomations.com/${file.file_path}`;

                      if (file.file_type === "image") {
                        return (
                          <div key={index} className="overflow-hidden rounded-xl border border-gray-100 bg-slate-100 h-48 sm:h-56">
                            <img
                              src={fileUrl}
                              alt={`${project.title} media ${index + 1}`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        );
                      }

                      if (file.file_type === "video") {
                        return (
                          <div key={index} className="overflow-hidden rounded-xl border border-gray-100 bg-brand-black/5">
                            <video controls className="w-full h-48 sm:h-56 max-h-72 object-cover bg-black">
                              <source src={fileUrl} />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        );
                      }

                      return (
                        <div key={index} className="bg-slate-100 border border-gray-200 p-4 rounded-xl flex flex-col justify-center">
                          <audio controls className="w-full">
                            <source src={fileUrl} />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      );
                    })}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}