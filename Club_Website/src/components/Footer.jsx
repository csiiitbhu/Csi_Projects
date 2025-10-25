import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaDribbble,
  FaEnvelope,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const bulbImg = useRef(null);
  const layersRef = useRef([]);
  const containerRef = useRef(null);
  const textContentRef = useRef(null);
  const ctx = useRef();
  const location = useLocation();

  const addToLayers = (el) => {
    if (el && !layersRef.current.includes(el)) {
      layersRef.current.push(el);
    }
  };

  useEffect(() => {
      const currentCtx = ctx.current;
    
    if (currentCtx) {
      currentCtx.revert();
    }
    const img = bulbImg.current;
    const layers = layersRef.current;
    const container = containerRef.current;
    const textContent = textContentRef.current;
    
    if (!img || !container || !textContent) return;

    gsap.set([img, ...layers], { 
      clearProps: "all" 
    });

    gsap.set(img, { 
      opacity: 0, 
      y: -80, 
      scale: 0.8, 
      rotate: -45,
      filter: "none"
    });

    gsap.set(layers, {
      opacity: 0,
      scale: 1, // All layers same scale
      rotation: 0,
      transformOrigin: "center center"
    });

    gsap.set(textContent, {
      zIndex: 30,
      opacity: 1
    });

    const initTimer = setTimeout(() => {
      ctx.current = gsap.context(() => {

        const containerAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 90%",   
            end: "bottom top",  
            toggleActions: "play none none reverse", 
            markers: false,
          }
        });

        // All layers have the same position and scale, only rotation differs
        layers.forEach((layer, index) => {
          const delay = index * 0.08;
          const rotation = (index % 2 === 0) ? 10 : -10; // Increased rotation for more visible effect
          
          containerAnimation.fromTo(layer, 
            {
              opacity: 0,
              rotation: rotation * 2,
            },
            {
              opacity: 0.8 - (index * 0.2), // Slightly adjusted opacity for better layering
              rotation: rotation,
              duration: 0.6, 
              ease: "power2.out", 
              delay: delay
            },
            "-=0.3"
          );
        });

        containerAnimation.to(img, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.8, 
          ease: "back.out(1.4)", 
        }, "-=0.5");

        const floatingAnimation = gsap.timeline({ repeat: -1, yoyo: true });
        floatingAnimation.to([...layers, img], {
          y: -12, 
          duration: 1.5, 
          ease: "sine.inOut"
        });

        // Continuous rotation animation for layers
        layers.forEach((layer, index) => {
          gsap.to(layer, {
            rotation: `+=${(index % 2 === 0) ? 15 : -15}`, // Relative rotation
            duration: 8 + (index * 1), // Slower rotation for more subtle effect
            repeat: -1,
            ease: "none"
          });
        });

        const glowAnimation = gsap.timeline({ repeat: -1, yoyo: true });
        glowAnimation.to(img, {
          filter: "drop-shadow(0 0 20px rgba(255, 204, 0, 0.8)) drop-shadow(0 0 40px rgba(255, 170, 0, 0.6))",
          duration: 1.5,
          ease: "sine.inOut"
        });

        layers.forEach((layer, index) => {
          gsap.to(layer, {
            boxShadow: `0 0 ${15 + (index * 3)}px rgba(255, 204, 0, ${0.3 - (index * 0.1)})`,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2
          });
        });

        setTimeout(() => ScrollTrigger.refresh(), 200);

      }, container);
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (ctx.current) ctx.current.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [location.pathname]);

  return (
    
    <section className="bg-black relative overflow-y-visible rounded-tl-[2rem] rounded-tr-[3rem]">

      <footer className="bg-yellow-400 text-[#fffcfc] relative bottom-10 -mb-8 max-sm:ml-5 sm:ml-20 rounded-bl-[6rem] rounded-tr-[6rem] rounded-br-[6rem] rounded-tl-[6rem]">
        <div ref={containerRef} className="flex flex-col md:flex-row justify-between items-center rounded-tr-[3rem] rounded-tl-[3rem] p-10 md:p-16 relative min-h-[400px]">
          
          <div 
            ref={textContentRef}
            className="z-30 max-w-lg relative pointer-events-none"
            style={{ 
              zIndex: 30,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 drop-shadow-md text-[#ae0080d3]">
              Where ideas meet impact.
            </h2>
            <p className="text-[#444444] mb-6 text-lg opacity-100 font-medium">
              Let's team up to create meaningful, sustainable, and innovative
              projects together!
            </p>
          </div>
        </div>
      </footer>

      {/* All layers now have the exact same position and size */}
      <div 
        ref={addToLayers}
        className="absolute sm:right-28  max-sm:right-[28%] max-sm:top-[45%] top-[15%] w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-gradient-to-br from-yellow-300 to-yellow-500 max-sm:rounded-[2rem] rounded-[4rem] opacity-50"
        style={{ zIndex: 1 }}
      />
      <div 
        ref={addToLayers}
        className="absolute sm:right-28 max-sm:right-[28%] max-sm:top-[45%] top-[15%] w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-gradient-to-br from-yellow-400 to-yellow-600 max-sm:rounded-[2rem] rounded-[4rem] opacity-40"
        style={{ zIndex: 2 }}
      />
      <div 
        ref={addToLayers}
        className="absolute sm:right-28  max-sm:right-[28%] max-sm:top-[45%] top-[15%] w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-gradient-to-br from-yellow-500 to-yellow-700 max-sm:rounded-[2rem] rounded-[4rem] opacity-30"
        style={{ zIndex: 3 }}
      />
      <div 
        ref={addToLayers}
        className="absolute sm:right-28  max-sm:right-[28%] max-sm:top-[45%] top-[15%] w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-gradient-to-br from-purple-500 to-pink-600 max-sm:rounded-[2rem] rounded-[4rem] opacity-25"
        style={{ zIndex: 4 }}
      />

      <img
        ref={bulbImg}
        src="/Images/csi-7.png"
        alt="Eco innovation illustration"
        className="absolute sm:right-28 max-sm:right-[28%] max-sm:top-1/2 top-1/4 w-40 sm:w-56 md:w-72 lg:w-80 xl:w-[420px] h-auto z-10"
        style={{ zIndex: 10 }}
        onLoad={() => {
          setTimeout(() => ScrollTrigger.refresh(), 150);
        }}
      />

      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 border-t border-[#8B5CF6]/30 ">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-4 md:mb-0">
          <span className="text-xl font-bold tracking-wide text-[#880163]">
            CSI
          </span>
          <nav className="flex gap-2 text-white text-sm items-center">
            <a
              href="https://mail.google.com/mail/?view=cm&to=csi@iitbhu.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover: text-[#EA4335] transition flex items-center gap-2"
            >
              <FaEnvelope className="w-5 h-5" />
              csi@iitbhu.ac.in
            </a>
          </nav>
        </div>

      <div className="flex gap-4 text-white text-3xl mt-5">
          <a
            href="https://www.instagram.com/csi_iitbhu/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E4405F] transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com/csi_iitbhu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1DA1F2] transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/company/csi-iitbhu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0A66C2] transition"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.facebook.com/iitbhu.csi/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1877F2] transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.threads.net/@csi_iitbhu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#564040] transition"
          >
            <FaDribbble />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&to=csi@iitbhu.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#EA4335] transition"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>

      <div className="text-center text-white text-sm pb-4">
        ©️ Copyright 2024{" "}
        <span className="font-semibold text-white-300">
          CSI
        </span>{" "}
        &nbsp; | &nbsp;
        <a href="#privacy" className="hover:text-[#ffffff] transition">
          Privacy Policy
        </a>
      </div>
    </section>
  );
};

export default Footer;