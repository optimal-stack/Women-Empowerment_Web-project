import React from "react";
import "./Homepage.css"
function Homepage() {
    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
            <link
                href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                rel="stylesheet"/>
            <header className="hero">
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Abel&family=Dancing+Script:wght@400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet"/>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
                      integrity="sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOM70d7tqAErP8c2ytPBd04B+1MgKkWzkP6k6Z4h"
                      crossOrigin="anonymous"/>


                <div className="nav-bar">
                    <div className="logo-placeholder">SHEroic</div>
                    <ul>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#focus">Our Focus</a></li>
                        <li><a href="#projects">Projects</a></li>

                    </ul>
                    <a href="#login" className="login-btn">Login</a>
                </div>

                <div className="hero-content">
                    <h1>Empowering Girls Through Code</h1>
                    <p>Building the future, one line of code at a time.</p>
                    <a href="#about" className="learn-more">Learn More</a>
                </div>
            </header>


            <div className="about-us-container">
                <h2>About Us</h2>
                <div className="team">
                    <div className="team-member">
                        <img src="/prince.jpg" alt="Princeraj Parmar" className="profile-pic"/>
                        <h3>Princeraj Parmar</h3>
                        <p>Front-end Developer | Passionate about coding and design.</p>
                        </div>
                        <div className="team-member">
                            <img src="/dhruv.jpg" alt="Dhruv Saini" className="profile-pic"/>
                            <h3>Dhruv Saini</h3>
                            <p>Back-end Developer | Focused on logic and server-side technologies.</p>
                        </div>
                    </div>
                </div>




            <section id="focus" class="section focus">
                <h2>Our Focus</h2>
                <div class="focus-container">
                    <div class="focus-item">
                        <h3>Workshops</h3>
                        <p>Interactive workshops where girls can learn to code and develop apps, websites, and software
                            solutions.</p>
                    </div>
                    <div class="focus-item">
                        <h3>Mentorship</h3>
                        <p>Providing guidance from experienced women in tech to help girls grow their skills and
                            confidence.</p>
                    </div>
                </div>
            </section>


            <section id="projects" class="section projects">
                <h2>Projects</h2>
                <div class="projects-container">
                    <div class="project-item">
                        <h3>Code4Her</h3>
                        <p>An initiative that teaches girls in underrepresented communities the fundamentals of web
                            development.</p>
                    </div>
                    <div class="project-item">
                        <h3>Girls in AI</h3>
                        <p>Encouraging young girls to dive into artificial intelligence, machine learning, and data
                            science.</p>
                    </div>
                </div>
            </section>


            <footer>
                <div className="social-links">
                    <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                    <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                </div>
            </footer>

        </>
    )
}

export default Homepage;
