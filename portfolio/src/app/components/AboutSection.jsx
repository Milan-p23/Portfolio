"use client";
import { useState, useTransition } from "react";
import Image from "next/image";

const TABS = ["Skills", "Education"];

const SKILLS = [
  {
    title: "Databases",
    technologies: [
      { name: "PostgreSQL", icon: "/icons/postgresql.svg", experience: 85, invert: false },
      { name: "Oracle", icon: "/icons/icons8-oracle-logo.svg", experience: 75, invert: false },
      { name: "MySQL", icon: "/icons/mysql.svg", experience: 80, invert: false },
      { name: "MongoDB", icon: "/icons/mongodb.svg", experience: 70, invert: false },
    ],
  },
  {
    title: "Backend",
    technologies: [
      { name: ".NET/C#", icon: "/icons/csharp.svg", experience: 90, invert: false },
      { name: "Java", icon: "/icons/java.svg", experience: 85, invert: false },
      { name: "Node.js", icon: "/icons/nodejs.svg", experience: 88, invert: false },
      { name: "SpringBoot", icon: "/icons/icons8-spring-boot.svg", experience: 80, invert: false },
    ],
  },
  {
    title: "Frontend",
    technologies: [
      { name: "React", icon: "/icons/react.svg", experience: 92, invert: false },
      { name: "TypeScript", icon: "/icons/typescript.svg", experience: 85, invert: false },
      { name: "Next.js", icon: "/icons/nextjs.svg", experience: 88, invert: true },
      { name: "Angular", icon: "/icons/angular.png", experience: 75, invert: false },
    ],
  },
  {
    title: "DevOps",
    technologies: [
      { name: "Git", icon: "/icons/git.svg", experience: 90, invert: false },
      { name: "GitHub Actions", icon: "/icons/github.svg", experience: 80, invert: false },
      { name: "AWS", icon: "/icons/aws.svg", experience: 85, invert: false },
      { name: "Docker", icon: "/icons/docker.svg", experience: 88, invert: false },
    ],
  },
];

const EDUCATION = [
  {
    institution: "George Brown College",
    logo: "/images/George_Brown_College_logo.png",
    program: "Advance Diploma - Computer Programming and Analysis",
    location: "Toronto, Ontario, Canada",
    period: "September 2022 - April 2025",
    achievements: [
      "Cumulative GPA 3.77 / 4.0",
      "George Brown College Dean's Honour List 2023 - 2025",
    ],
  },
  {
    institution: "ServeEase",
    logo: "/images/ser.png",
    program: "Software Developer - Capstone Project",
    location: "Toronto, Ontario, Canada",
    period: "September 2024 - Present",
    achievements: [],
  },
];

const Progress = ({ value }) => {
  return (
    <div className="w-full h-1 bg-gray-300 rounded-full">
      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${value}%` }}></div>
    </div>
  );
};

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("Skills");

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/aboutImage.png" width={500} height={500} alt="about Image" />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg text-gray-300">
            I am a full stack web developer with a passion for creating interactive and responsive web applications. I have experience working with JavaScript, React, Redux, Node.js, Express, PostgreSQL, Sequelize, HTML, CSS, and Git. I am a quick learner and I am always looking to expand my knowledge and skill set. I am a team player and I am excited to work with others to create amazing applications.
          </p>

          {/* Tabs for Skills & Education */}
          <div className="flex mt-8 border-b border-gray-600">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`mr-6 pb-2 text-lg font-semibold ${
                  activeTab === tab ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"
                } transition duration-300`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Switching */}
          {activeTab === "Skills" ? (
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {SKILLS.map((skill, idx) => (
                <div key={idx} className="bg-gray-800 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                  <h3 className="text-2xl font-semibold mb-4 text-white">{skill.title}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {skill.technologies.map((technology, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-16 h-16 flex items-center justify-center mb-2">
                          <Image
                            src={technology.icon}
                            alt={technology.name + " icon"}
                            width={48}
                            height={48}
                            className={technology.invert ? "invert" : ""}
                          />
                        </div>
                        <p className="text-sm text-center text-gray-300 mb-2">{technology.name}</p>
                        <div className="w-full max-w-24">
                          <Progress value={technology.experience} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <div className="space-y-6 mt-6">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-4 transition-transform duration-300 hover:scale-105">
                  <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center">
                    <Image
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-white">{edu.institution}</h3>
                    <p className="text-blue-400">{edu.program}</p>
                    <p className="text-gray-400">{edu.location}</p>
                    <p className="text-gray-400 mb-2">{edu.period}</p>
                    {edu.achievements.length > 0 && (
                      <ul className="list-disc pl-5 text-gray-300 space-y-1">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
