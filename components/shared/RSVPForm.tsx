"use client";

import { useState } from "react";

type GuestType = "single" | "couple" | "family";

const guestTypes: { id: GuestType; label: string }[] = [
  { id: "single", label: "Single" },
  { id: "couple", label: "Couple" },
  { id: "family", label: "Family" },
];

export default function RSVPForm() {
  const [guestType, setGuestType] = useState<GuestType>("single");

  return (
    <div className="rsvp-panel">
      <div className="guest-tabs" role="tablist" aria-label="Guest type">
        {guestTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            role="tab"
            aria-selected={guestType === type.id}
            className={guestType === type.id ? "active" : ""}
            onClick={() => setGuestType(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>

      <form className="rsvp-form">
        {/* <div className="tab-intro"><span>RSVP as</span><strong>{guestType}</strong></div> */}

        {guestType === "single" && (
          <label>
            Full name
            <input type="text" name="fullName" placeholder="Your full name" />
          </label>
        )}

        {guestType === "couple" && (
          <fieldset className="name-group">
            <legend>Couple names</legend>
            <div className="two-columns">
              <label>
                Boy&apos;s name
                <input type="text" name="boyName" placeholder="Full name" />
              </label>
              <label>
                Girl&apos;s name
                <input type="text" name="girlName" placeholder="Full name" />
              </label>
            </div>
          </fieldset>
        )}

        {guestType === "family" && (
          <div className="two-columns family-fields">
            <label>
              Family representative
              <input
                type="text"
                name="representative"
                placeholder="Full name"
              />
            </label>
            <label>
              Total guests
              <input
                type="number"
                name="guestCount"
                min="1"
                placeholder="Including yourself"
              />
            </label>
          </div>
        )}

        <div className="two-columns contact-fields">
          <label>
            Phone number
            <input type="tel" name="phone" placeholder="Your phone number" />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="Your email address" />
          </label>
        </div>

        <fieldset className="choice-group">
          <legend>Which side are you joining?</legend>
          <div className="choice-grid side-options">
            <label>
              <input type="radio" name={`${guestType}-side`} value="groom" />{" "}
              Groom&apos;s side
            </label>
            <label>
              <input type="radio" name={`${guestType}-side`} value="bride" />{" "}
              Bride&apos;s side
            </label>
            <label>
              <input type="radio" name={`${guestType}-side`} value="both" />{" "}
              Both sides
            </label>
          </div>
        </fieldset>

        <fieldset className="choice-group">
          <legend>Your relationship</legend>
          <div className="choice-grid relationship-options">
            {[
              ["family", "Family"],
              ["relative", "Relative"],
              ["friend", "Friend"],
              ["colleague", "Colleague"],
              ["others", "Others"],
            ].map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name={`${guestType}-relationship`}
                  value={value}
                />{" "}
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <label>
          Special message
          <textarea
            name="message"
            placeholder="Leave a wish for the happy couple"
            rows={4}
          />
        </label>
        <button className="rsvp-submit" type="button">
          Send RSVP
        </button>
      </form>
    </div>
  );
}
