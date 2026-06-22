import { MARQUEE_ITEMS } from "../../constants/content";

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee" aria-hidden="true">
        {[0, 1].map((dup) => (
          <span className="marquee-track" key={dup}>
            {MARQUEE_ITEMS.map((item) => (
              <span className="marquee-item" key={`${dup}-${item.bold}`}>
                <b>{item.bold}</b> · {item.rest}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
