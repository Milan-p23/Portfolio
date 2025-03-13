"use client";
import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Weather App 🌦️",
    description: "A modern weather application built with React, powered by the OpenWeatherMap API. It provides real-time weather updates, a 5-day forecast, and a sleek, responsive design.",
    image: "/images/projects/weather1.png", // Add the path to your Weather App screenshot
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Milan-p23/101397631_comp3123_labtest2", // Add your GitHub repo link
    previewUrl: [
      "/images/projects/forecasts.png"// Add paths to your Weather App screenshots
    ],
  },
  {
    id: 2, 
    title: "Real-Time Chat Application 💬",
    description: "A real-time chat application built with Socket.io, Express.js, and MongoDB. Features include user authentication, group chat, private messaging, message persistence, and typing indicators.",
    image: "/images/projects/PrivateChat.png",
    tag: ["All", "Web"], 
    gitUrl: "https://github.com/Milan-p23/101397631_lab_test1_chat_app", 
    previewUrl: [
      "/images/projects/ChatLogin.png", // Path to screenshot 2
      "/images/projects/ChatSignup.png", 
      "/images/projects/PrivateChat.png", // Path to screenshot 3
      "/images/projects/GroupCHat.png", 
      

    ],
  },
  {
    id: 3,
    title: "Employee Management System 👨‍💼",
    description: "A full-stack employee management system built with React, Node.js, and MongoDB. Features include user authentication (login/signup), employee CRUD operations, and advanced search functionality by name, department, or position.",
    image: "/images/projects/listemp.png", // Path to the project's main image
    tag: ["All", "Web"], // Tags for filtering
    gitUrl: "https://github.com/your-username/employee-management-system", // GitHub repository link
    previewUrl: [
      "/images/projects/Loginemp.png", // Login/Signup page
      "/images/projects/signupemp.png", // Employee list page
      "/images/projects/listemp.png", // Add employee form
      "/images/projects/addemp.png", // Search functionality
      "/images/projects/searchemp.png", // Edit employee details
      "/images/projects/editemp.png",
    ],
  },
  {
    id: 4,
    title: "Todo List App 📱",
    description: "A mobile Todo List application built using SwiftUI and Xcode for iOS. Features include user authentication (login/signup), task management (add, edit, delete, uncomplete tasks), and profile settings. Firebase is used for authentication and data storage.",
    image: "/images/projects/TodoLogo.png", // Path to the project's main image
    tag: ["All", "Mobile"], // Tags for filtering
    gitUrl: "https://github.com/Milan-p23/ToDoList", // GitHub repository link
    previewUrl: [
      "/images/projects/TodoLogin.png", // Login page
      "/images/projects/TodoSignup.png", // Signup page
      "/images/projects/TodoHome.png", // Home screen with task list
      "/images/projects/TodoAddTask'.png", // Add task screen
      "/images/projects/TodoProfile.png", // Profile settings screen
    ],
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedProject) return;
      if (event.key === "Escape") handleCloseModal();
      if (event.key === "ArrowRight") handleNextImage();
      if (event.key === "ArrowLeft") handlePrevImage();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const handlePreviewClick = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  };

  const handleNextImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex + 1 < selectedProject.previewUrl.length ? prevIndex + 1 : 0
    );
  };

  const handlePrevImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : selectedProject.previewUrl.length - 1
    );
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  return (
    <section id="projects">
      <div
        className={`content-wrapper ${
          selectedProject ? "blur-background" : ""
        }`}
      >
        <h2 className="text-center text-4xl font-bold text-white mt-4 md:mb-12">
          My Projects
        </h2>
        <div className="text-white flex flex-row justify-center items-center gap-2 py-4">
          <ProjectTag
            onClick={handleTagChange}
            name="All"
            isSelected={tag === "All"}
          />
          <ProjectTag
            onClick={handleTagChange}
            name="Web"
            isSelected={tag === "Web"}
          />
          <ProjectTag
            onClick={handleTagChange}
            name="Mobile"
            isSelected={tag === "Mobile"}
          />
        </div>
        <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
          {filteredProjects.map((project, index) => (
            <motion.li
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.3, delay: index * 0.4 }}
            >
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                imgUrl={project.image}
                gitUrl={project.gitUrl}
                previewUrl={project.previewUrl}
                onPreview={() => handlePreviewClick(project)}
              />
            </motion.li>
          ))}
        </ul>
      </div>

      {selectedProject && (
        <motion.div className="fixed inset-0 bg-[rgba(0,0,0,0.59)] flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="relative bg-pastel-blue p-4 rounded-lg shadow-lg w-full max-w-md backdrop-blur-lg">
            <button
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-red-500 text-white font-extrabold rounded-full"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-3 text-white text-left">
              {selectedProject.title}
            </h3>
            <div className="relative flex justify-center items-center">
              {/* Left Navigation Button */}
              <button
                className="absolute left-0 top-0 h-full w-[50px] bg-gradient-to-r from-[rgba(0,0,0,0.5)] to-transparent text-white flex items-center justify-center text-3xl font-bold"
                onClick={handlePrevImage}
              >
                {"<"}
              </button>
              {/* Image */}
              <img
                src={selectedProject.previewUrl[currentImageIndex]}
                className="w-[400px] h-[300px] object-contain rounded-lg"
              />
              {/* Right Navigation Button */}
              <button
                className="absolute right-0 top-0 h-full w-[50px] bg-gradient-to-l from-[rgba(0,0,0,0.5)] to-transparent text-white flex items-center justify-center text-3xl font-bold"
                onClick={handleNextImage}
              >
                {">"}
              </button>
            </div>
            <div className="flex justify-center mt-3">
              {selectedProject.previewUrl.map((_, index) => (
                <span
                  key={index}
                  className={`h-2.5 w-2.5 mx-1 rounded-full ${
                    index === currentImageIndex ? "bg-purple-500" : "bg-white"
                  }`}
                ></span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsSection;
