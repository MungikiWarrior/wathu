import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { startLogin } from "@/const";
import { ArrowRight, Palette, Zap, Users } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-background via-background to-accent/5">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-balance leading-tight">
                  Elevate Your Brand with <span className="gradient-text">Exceptional Design</span>
                </h1>
                <p className="text-xl text-foreground/70 text-balance">
                  Professional graphic design services tailored to bring your vision to life. From logos to complete brand identities, we create designs that resonate.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                {isAuthenticated ? (
                  <Link href="/submit">
                    <a className="inline-block">
                      <Button className="btn-premium-primary gap-2">
                        Submit Your Project <ArrowRight size={18} />
                      </Button>
                    </a>
                  </Link>
                ) : (
                  <Button
                    onClick={() => startLogin()}
                    className="btn-premium-primary gap-2"
                  >
                    Get Started <ArrowRight size={18} />
                  </Button>
                )}
                <Button variant="outline" className="btn-premium-secondary">
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center mb-16">
              <h2>Our Services</h2>
              <p className="text-lg text-foreground/70 mt-4 max-w-2xl mx-auto">
                Comprehensive design solutions for every aspect of your brand
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Palette,
                  title: "Logo Design",
                  description: "Distinctive logos that capture your brand essence and leave lasting impressions.",
                },
                {
                  icon: Zap,
                  title: "Branding",
                  description: "Complete brand identity systems including guidelines, color palettes, and typography.",
                },
                {
                  icon: Users,
                  title: "UI/UX Design",
                  description: "User-centered digital experiences that are beautiful, intuitive, and effective.",
                },
              ].map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div key={idx} className="card-elegant p-8 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="text-accent" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-foreground/70">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="section-padding bg-card/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2>Recent Work</h2>
              <p className="text-lg text-foreground/70 mt-4 max-w-2xl mx-auto">
                Showcase of our latest design projects and client success stories
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="card-elegant overflow-hidden group cursor-pointer"
                >
                  <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/10 transition-colors">
                    <div className="text-center space-y-2">
                      <Palette size={48} className="text-accent/50 mx-auto" />
                      <p className="text-sm text-foreground/50">Project {item}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold mb-2">Project Title</h3>
                    <p className="text-sm text-foreground/70">Brand Identity Design</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section-padding">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2>About Design Hub</h2>
                <p className="text-foreground/70 leading-relaxed">
                  We are a team of passionate designers dedicated to creating exceptional visual experiences. With years of experience across various industries, we understand what it takes to make your brand stand out.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  Our approach combines strategic thinking with creative excellence, ensuring every design solution not only looks beautiful but also drives meaningful results for your business.
                </p>
                <div className="flex gap-8 pt-4">
                  <div>
                    <p className="text-3xl font-bold gradient-text">50+</p>
                    <p className="text-sm text-foreground/70">Projects Completed</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold gradient-text">40+</p>
                    <p className="text-sm text-foreground/70">Happy Clients</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold gradient-text">5+</p>
                    <p className="text-sm text-foreground/70">Years Experience</p>
                  </div>
                </div>
              </div>

              <div className="aspect-square rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <div className="text-center">
                  <Palette size={64} className="text-accent/50 mx-auto mb-4" />
                  <p className="text-foreground/50">Design Showcase</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-accent/10 to-accent/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2>Ready to Transform Your Brand?</h2>
                <p className="text-lg text-foreground/70">
                  Let's collaborate on your next design project. Submit your brief and let's create something extraordinary together.
                </p>
              </div>

              {isAuthenticated ? (
                <Link href="/submit">
                  <a className="inline-block">
                    <Button className="btn-premium-primary gap-2 text-lg px-8 py-6">
                      Submit Your Project <ArrowRight size={20} />
                    </Button>
                  </a>
                </Link>
              ) : (
                <Button
                  onClick={() => startLogin()}
                  className="btn-premium-primary gap-2 text-lg px-8 py-6"
                >
                  Get Started <ArrowRight size={20} />
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
