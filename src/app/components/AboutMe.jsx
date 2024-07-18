"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
    {
        title: "Skills",
        id: "skills",
        content: (
            <div className="flex flex-wrap gap-4">
                <span className="bg-gray-800 px-3 py-1 rounded-full">Node.js</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">Express</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">Java</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">PHP</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">SQL & No SQL</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">JavaScript</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">React</span>
            </div>
        ),
    },
    {
        title: "Education",
        id: "education",
        content: (
            <ul className="list-disc pl-2">
                <p>Bsc IT(R) University of Jaffna | 2022 – 2025</p>
            </ul>
        ),
    },
    {
        title: "Certifications",
        id: "certifications",
        content: (
            <ul className="list-disc pl-2">
                <li>JavaScript Essential by CISCO</li>
                <li>Google Garager</li>
                <li>IEEE Xtreame Participation</li>
                
            </ul>
        ),
    },
];

const AboutSection = () => {
    const [tab, setTab] = useState("skills");
    const [isPending, startTransition] = useTransition();

    const handleTabChange = (id) => {
        startTransition(() => {
            setTab(id);
        });
    };

    return (
        <section className="text-white" id="about">
            <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
                <Image src="/images/AboutMe.png" width={500} height={500} />
                <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                    <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
                    <p className="text-base lg:text-lg">
                        I am a versatile full stack web developer with
                        a passion for creating interactive and responsive
                        web applications. My expertise extends across
                        JavaScript, React, Redux, Node.js, Express, Next.js,
                        HTML, CSS, and Git. Additionally,
                        I am an experienced mobile developer
                        and a UI/UX designer. Whether it's web 
                        development, mobile app development, or crafting 
                        compelling UI/UX designs, I am dedicated to 
                        delivering high-quality results.
                    </p>
                    <div className="flex flex-row justify-start mt-8">
                        <TabButton
                            selectTab={() => handleTabChange("skills")}
                            active={tab === "skills"}
                        >
                            Skills
                        </TabButton>
                        <TabButton
                            selectTab={() => handleTabChange("education")}
                            active={tab === "education"}
                        >
                            Education
                        </TabButton>
                        <TabButton
                            selectTab={() => handleTabChange("certifications")}
                            active={tab === "certifications"}
                        >
                            Certifications
                        </TabButton>
                    </div>
                    <div className="mt-8">
                        {TAB_DATA.find((t) => t.id === tab).content}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;