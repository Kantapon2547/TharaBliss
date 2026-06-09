"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  return (
    <>
      <Navbar />

      <main
        style={{
          background: "#FAFAF7",
          minHeight: "100vh",
          fontFamily:
            "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        {/* Hero */}
        <section
          style={{
            background: "#FBF5DD",
            padding: "5rem 2rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#6E7C72",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontSize: "12px",
            }}
          >
            Contact Us
          </p>

          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: 300,
              color: "#2F3A33",
              marginTop: "1rem",
            }}
          >
            We'd Love to Hear From You
          </h1>

          <p
            style={{
              maxWidth: "650px",
              margin: "1.5rem auto 0",
              color: "#666",
              lineHeight: 1.8,
            }}
          >
            Whether you're interested in our aroma products,
            custom gifts, wedding favors, or collaborations,
            feel free to get in touch.
          </p>
        </section>

        {/* Contact Section */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "5rem 2rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
          }}
        >
          {/* Contact Info */}
          <div>
            <h2
              style={{
                fontSize: "2rem",
                color: "#2F3A33",
                marginBottom: "2rem",
              }}
            >
              Get In Touch
            </h2>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "#0F6E56" }}>Email</h3>
              <p style={{ color: "#666" }}>
                hello@tharabliss.com
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "#0F6E56" }}>Phone</h3>
              <p style={{ color: "#666" }}>
                +66 xx xxx xxxx
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "#0F6E56" }}>Instagram</h3>
              <p style={{ color: "#666" }}>
                @tharabliss
              </p>
            </div>

            <div>
              <h3 style={{ color: "#0F6E56" }}>Location</h3>
              <p style={{ color: "#666" }}>
                Bangkok, Thailand
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "24px",
              border: "1px solid #eee",
            }}
          >
            <h2
              style={{
                marginBottom: "1.5rem",
                color: "#2F3A33",
              }}
            >
              Send a Message
            </h2>

            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                style={inputStyle}
              />

              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                style={inputStyle}
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                style={inputStyle}
              />

              <textarea
                placeholder="Your Message"
                rows={6}
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
                style={{
                  ...inputStyle,
                  resize: "none",
                }}
              />

              <button
                type="submit"
                style={{
                  padding: "14px",
                  background: "#0F6E56",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  outline: "none",
  fontSize: "14px",
} as const;