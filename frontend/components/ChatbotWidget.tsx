"use client";

import { useEffect, useState, useRef } from "react";
import { getAnnouncements, Announcement } from "@/lib/api";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageGroup,
} from "@chatscope/chat-ui-kit-react";

const POLL_INTERVAL = 30_000;
const STORAGE_KEY = "thara_last_seen_announcement_id";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAnnouncements = async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
      const lastSeen = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
      const unread = data.filter((a) => a.id > lastSeen).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error("Widget fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    intervalRef.current = setInterval(fetchAnnouncements, POLL_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
    if (announcements.length > 0) {
      const maxId = Math.max(...announcements.map((a) => a.id));
      localStorage.setItem(STORAGE_KEY, String(maxId));
      setUnreadCount(0);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <style>{`
        .thara-chat-wrapper {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
        .thara-chat-panel {
          width: 340px;
          height: 480px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.15);
          border: 1px solid #EFEAE1;
          display: flex;
          flex-direction: column;
          animation: slide-up 0.25s ease;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .thara-chat-header {
          background: #0F6E56;
          color: #FBF5DD;
          padding: 0.9rem 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }
        .thara-chat-header-close {
          background: rgba(255,255,255,0.15);
          border: none;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          cursor: pointer;
          color: #FBF5DD;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }
        .thara-chat-panel .cs-main-container {
          border: none !important;
        }
        .thara-chat-panel .cs-chat-container {
          background: #F5F2EB !important;
        }
        .thara-chat-panel .cs-message-list {
          background: #F5F2EB !important;
          padding: 0.75rem !important;
        }
        .thara-chat-panel .cs-message__content {
          background: #FFFFFF !important;
          color: #2F3A33 !important;
          border: 1px solid #EFEAE1 !important;
          border-radius: 0 12px 12px 12px !important;
          font-size: 0.85rem !important;
          line-height: 1.6 !important;
        }
        .thara-chat-panel .cs-message-group__avatar .cs-avatar {
          background: #0F6E56 !important;
        }
        .thara-chat-panel .cs-message-list__scroll-wrapper {
          padding: 0 !important;
        }

        @keyframes pulse-ring {
          0%   { transform: scale(1);    opacity: 0.6; }
          70%  { transform: scale(1.55); opacity: 0;   }
          100% { transform: scale(1.55); opacity: 0;   }
        }
        .thara-bubble-pulse::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #0F6E56;
          animation: pulse-ring 2s ease-out infinite;
          z-index: -1;
        }
        .thara-bubble {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #0F6E56;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(15,110,86,0.35);
          transition: transform 0.2s;
        }
        .thara-bubble:hover {
          transform: scale(1.08);
        }
        .thara-badge {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #E53935;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #fff;
        }

        .thara-announce-card {
          background: #FFFFFF;
          border: 1px solid #EFEAE1;
          border-radius: 12px;
          overflow: hidden;
          width: 220px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .thara-announce-card:hover {
          border-color: #0F6E56;
          box-shadow: 0 2px 12px rgba(15,110,86,0.10);
        }
        .thara-announce-card img {
          width: 100%;
          height: 100px;
          object-fit: cover;
          display: block;
        }
        .thara-announce-card-body {
          padding: 0.6rem 0.8rem;
        }
        .thara-announce-card-name {
          font-size: 0.75rem;
          color: #0F6E56;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin: 0 0 0.2rem;
        }
        .thara-announce-card-msg {
          font-size: 0.82rem;
          color: #2F3A33;
          line-height: 1.5;
          margin: 0 0 0.45rem;
        }
        .thara-announce-card-link {
          font-size: 0.76rem;
          color: #0F6E56;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.15s;
        }
        .thara-announce-card-link:hover {
          color: #0a5240;
        }
        .thara-chat-footer {
          background: #FFFFFF;
          border-top: 1px solid #EFEAE1;
          padding: 0.5rem 1rem;
          text-align: center;
          font-size: 10px;
          color: #bbb;
          letter-spacing: 0.06em;
          flex-shrink: 0;
        }
      `}</style>

      <div className="thara-chat-wrapper">

        {open && (
          <div className="thara-chat-panel">

            <div className="thara-chat-header">
              <div>
                <p style={{ margin: 0, fontWeight: 500, fontSize: "0.95rem" }}>
                  Thara Bliss 🌿
                </p>
                <p style={{ margin: 0, fontSize: "11px", opacity: 0.7, marginTop: 2 }}>
                  What&apos;s New
                </p>
              </div>
              <button
                className="thara-chat-header-close"
                onClick={handleClose}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div style={{ flex: 1, minHeight: 0 }}>
              <MainContainer>
                <ChatContainer>
                  <MessageList>

                    <MessageGroup direction="incoming" sender="Thara Bliss" avatarPosition="cl">
                      <MessageGroup.Messages>
                        <Message
                          model={{
                            message: "สวัสดีค่ะ! 👋 นี่คือสินค้าใหม่และประกาศล่าสุดจาก Thara Bliss",
                            sentTime: "just now",
                            sender: "Thara Bliss",
                            direction: "incoming",
                            position: "single",
                          }}
                        />
                      </MessageGroup.Messages>
                    </MessageGroup>

                    {announcements.length === 0 && (
                      <MessageGroup direction="incoming" sender="Thara Bliss" avatarPosition="cl">
                        <MessageGroup.Messages>
                          <Message
                            model={{
                              message: "ยังไม่มีประกาศใหม่ในขณะนี้ค่ะ 🌿",
                              sentTime: "just now",
                              sender: "Thara Bliss",
                              direction: "incoming",
                              position: "single",
                            }}
                          />
                        </MessageGroup.Messages>
                      </MessageGroup>
                    )}

                    {announcements.map((a) => (
                      <MessageGroup
                        key={a.id}
                        direction="incoming"
                        sender="Thara Bliss"
                        avatarPosition="cl"
                      >
                        <MessageGroup.Messages>
                          <Message
                            model={{
                              type: "custom",
                              sentTime: a.created_at,
                              sender: "Thara Bliss",
                              direction: "incoming",
                              position: "single",
                            }}
                          >
                            <Message.CustomContent>
                              <div className="thara-announce-card">
                                {a.product_image_url && (
                                  <img src={a.product_image_url} alt={a.product_name} />
                                )}
                                <div className="thara-announce-card-body">
                                  <p className="thara-announce-card-name">{a.product_name}</p>
                                  <p className="thara-announce-card-msg">{a.message}</p>
                                  <a
                                    href={`/products/${a.product_id}`}
                                    className="thara-announce-card-link"
                                  >
                                    View Product →
                                  </a>
                                </div>
                              </div>
                            </Message.CustomContent>
                          </Message>
                        </MessageGroup.Messages>
                      </MessageGroup>
                    ))}

                  </MessageList>
                </ChatContainer>
              </MainContainer>
            </div>

            <div className="thara-chat-footer">
              Calm. Balance. Bliss. — Thara Bliss
            </div>
          </div>
        )}

        <button
          className={`thara-bubble ${!open ? "thara-bubble-pulse" : ""}`}
          onClick={open ? handleClose : handleOpen}
          aria-label="Open announcements"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FBF5DD" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FBF5DD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}

          {!open && unreadCount > 0 && (
            <span className="thara-badge">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

      </div>
    </>
  );
}