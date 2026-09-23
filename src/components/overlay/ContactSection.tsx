'use client';

import React, { useState } from 'react';
import { Send, Mail, Copy, Check, Globe, MapPin, Phone, FileText, ExternalLink } from 'lucide-react';
import { useSpatialStore } from '@/lib/store';
import styles from './Sections.module.css';

export default function ContactSection() {
  const activeChapter = useSpatialStore((state) => state.activeChapter);
  const portfolioData = useSpatialStore((state) => state.portfolioData);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const isActive = activeChapter === 5;
  const contact = portfolioData.contact;
  const resumeUrl = portfolioData.identity.resumeUrl;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    if (contact.phone) {
      navigator.clipboard.writeText(contact.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section
      className={`${styles.sectionContainer} ${isActive ? styles.activeSection : styles.inactiveSection}`}
      id="chapter-05"
      aria-label="Initiate Contact"
    >
      <div className={styles.contactCard}>
        {/* Resume Badge on Contact Card Border */}
        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeBadge}
            title="View Resume / CV Document"
          >
            <FileText size={13} className={styles.cyanIcon} />
            <span>RESUME // CV</span>
            <ExternalLink size={11} className={styles.resumeExternalIcon} />
          </a>
        )}

        <div className={styles.badgeRow}>
          <Send size={14} className={styles.cyanIcon} />
          <span>CHAPTER 05 // INITIATE CONTACT</span>
        </div>

        <h2 className={styles.contactTitle}>{`CONNECT WITH ${portfolioData.identity.name}`}</h2>
        <p className={styles.contactSubtitle}>
          Open for UI/UX design opportunities, visual design roles, creative team leadership, and campus & client collaborations.
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

        {contact.phone && (
          <div className={styles.emailBox} style={{ marginTop: '0.75rem' }}>
            <div className={styles.emailText}>
              <Phone size={16} className={styles.cyanIcon} />
              <a href={`tel:${contact.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                {contact.phone}
              </a>
            </div>
            
            <button
              type="button"
              className={styles.copyBtn}
              onClick={handleCopyPhone}
              aria-label="Copy phone number"
            >
              {copiedPhone ? (
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
        )}

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
