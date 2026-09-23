'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Copy, Check, Send, Globe, FileText } from 'lucide-react';
import { useSpatialStore } from '@/lib/store';
import styles from './ContactAnchor.module.css';

export default function ContactAnchor() {
  const activeChapter = useSpatialStore((state) => state.activeChapter);
  const portfolioData = useSpatialStore((state) => state.portfolioData);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (activeChapter !== 5) return null;

  const contact = portfolioData.contact;
  const resumeUrl = portfolioData.identity.resumeUrl;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className={styles.contactSection} aria-label="Contact Channel">
      <div className={styles.contactCard}>
        <div className={styles.badgeRow}>
          <Send size={14} className={styles.cyanIcon} />
          <span>CHAPTER 05 // INITIATE CONTACT</span>
        </div>

        <h2 className={styles.title}>{`CONNECT WITH ${portfolioData.identity.name}`}</h2>
        <p className={styles.subtitle}>
          Open for UI/UX design roles, visual design opportunities, creative leadership initiatives, and design collaborations.
        </p>

        <div className={styles.emailBox}>
          <div className={styles.emailText}>
            <Mail size={16} className={styles.cyanIcon} />
            <span>{contact.email}</span>
          </div>
          
          <button
            type="button"
            className={styles.copyBtn}
            onClick={handleCopyEmail}
            aria-label="Copy email address"
          >
            {copiedEmail ? (
              <>
                <Check size={14} className={styles.emeraldIcon} />
                <span>COPIED</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>COPY</span>
              </>
            )}
          </button>
        </div>

        <div className={styles.socialGrid}>
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <Globe size={18} />
              <span>LINKEDIN</span>
            </a>
          )}

          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              title="View Resume / CV Document"
            >
              <FileText size={18} className={styles.cyanIcon} />
              <span>RESUME // CV</span>
            </a>
          )}
        </div>

        <div className={styles.locationFooter}>
          <MapPin size={14} className={styles.cyanIcon} />
          <span>{`LOCATION: ${contact.location}`}</span>
        </div>
      </div>
    </section>
  );
}
