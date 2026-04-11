/**
 * Global SVG filter that gives elements a hand-drawn / sketch wobble effect.
 * Mount once at app root level.
 */
const SketchFilter = () => (
  <svg
    className="absolute w-0 h-0 pointer-events-none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Subtle wobble for cards, buttons, borders */}
      <filter id="sketch-wobble" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence
          type="turbulence"
          baseFrequency="0.015"
          numOctaves="3"
          seed="2"
          result="turbulence"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="turbulence"
          scale="2.5"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>

      {/* Heavier wobble for decorative lines & dividers */}
      <filter id="sketch-heavy" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence
          type="turbulence"
          baseFrequency="0.025"
          numOctaves="4"
          seed="7"
          result="turbulence"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="turbulence"
          scale="4"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>

      {/* Roughen text edges slightly */}
      <filter id="sketch-text" x="-2%" y="-2%" width="104%" height="104%">
        <feTurbulence
          type="turbulence"
          baseFrequency="0.04"
          numOctaves="2"
          seed="5"
          result="turbulence"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="turbulence"
          scale="1.2"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
);

export default SketchFilter;
