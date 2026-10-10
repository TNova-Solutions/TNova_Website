import { useEffect, useState } from "react";

import axios from "axios";

import { API_BASE_URL } from "../../../config";
import { setRole } from "../../../redux/slice/enquiry/EnquirySlice";
import Reveal from "../../animation/reveal/Reveal";
import "../contact/Contact.css";
import "./Careers.css";

const EMPTY = { role: "general", name: "", email: "", phone: "", profileUrl: "", message: "", website: "" };

export default function Careers({ globalState, dispatch }) {
  const { tag, title, desc, why, openings, general } = globalState?.careers || {};
  const preferredRole = globalState?.enquiry?.role;

  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  useEffect(() => {
    if (preferredRole) setForm((prev) => ({ ...prev, role: preferredRole }));
  }, [preferredRole]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError("");
    setDone("");
    setSubmitting(true);

    try {
      const { data } = await axios.post(`${API_BASE_URL}api/careers/apply`, form);
      setDone(data?.submitMsg || "Thanks for applying!");
      setForm((prev) => ({ ...EMPTY, role: prev.role }));
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          (err?.response?.status === 429
            ? "Too many submissions. Please try again in a few minutes."
            : "Unable to send your application. Please try again or email us directly.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section" id="careers">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">{tag}</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{desc}</p>
        </Reveal>

        <div className="careers-why">
          {why?.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="careers-why-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="careers-layout">
          <div className="careers-roles">
            <h3 className="careers-subtitle">Open roles</h3>
            {openings?.length ? (
              openings.map((job) => (
                <Reveal key={job.id}>
                  <article className="job-card">
                    <div className="job-meta">
                      <span>{job.type}</span>
                      <span>{job.location}</span>
                    </div>
                    <h4 className="job-title">{job.title}</h4>
                    <p className="job-desc">{job.desc}</p>
                    <div className="job-skills">
                      {job.skills?.map((s) => (
                        <span className="job-skill" key={s}>{s}</span>
                      ))}
                    </div>
                    <a
                      href="#apply"
                      className="job-apply"
                      onClick={() => dispatch?.(setRole(job.id))}
                      aria-label={`Apply for ${job.title}`}
                    >
                      Apply for this role →
                    </a>
                  </article>
                </Reveal>
              ))
            ) : (
              <p className="job-desc">No roles are listed right now, but we always read general applications.</p>
            )}
            {general && (
              <div className="job-card job-card-general">
                <h4 className="job-title">{general.title}</h4>
                <p className="job-desc">{general.desc}</p>
              </div>
            )}
          </div>

          <Reveal delay={80}>
            <form className="careers-form" id="apply" onSubmit={onSubmit} aria-labelledby="apply-title">
              <h3 className="careers-subtitle" id="apply-title">Apply</h3>

              {error && <div className="form-error" role="alert">{error}</div>}
              {done && <div className="form-success" role="status">{done}</div>}

              <div className="form-hp" aria-hidden="true">
                <label htmlFor="apply-website">Website</label>
                <input id="apply-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="apply-role">Role</label>
                <select id="apply-role" name="role" className="form-input" value={form.role} onChange={onChange}>
                  {openings?.map((job) => (
                    <option key={job.id} value={job.id}>{job.title}</option>
                  ))}
                  <option value="general">General application</option>
                </select>
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="apply-name">Full name</label>
                <input id="apply-name" name="name" className="form-input" type="text" autoComplete="name" maxLength={100} required value={form.name} onChange={onChange} />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="apply-email">Email</label>
                <input id="apply-email" name="email" className="form-input" type="email" autoComplete="email" maxLength={254} required value={form.email} onChange={onChange} />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="apply-phone">Phone (optional)</label>
                <input id="apply-phone" name="phone" className="form-input" type="tel" autoComplete="tel" maxLength={20} value={form.phone} onChange={onChange} />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="apply-profile">GitHub / LinkedIn / portfolio link (optional)</label>
                <input id="apply-profile" name="profileUrl" className="form-input" type="url" placeholder="https://github.com/you" maxLength={300} value={form.profileUrl} onChange={onChange} />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="apply-message">About you</label>
                <textarea id="apply-message" name="message" className="form-textarea" placeholder="Your experience, what you want to work on, and a link to your resume if you have one." maxLength={3000} required value={form.message} onChange={onChange} />
              </div>

              <p className="form-consent">
                By applying you agree we may store your details to consider you for roles. See our{" "}
                <a href="/privacy">Privacy Policy</a>.
              </p>
              <button className="form-submit" type="submit" disabled={submitting}>
                {submitting ? "Sending…" : "Submit application"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
