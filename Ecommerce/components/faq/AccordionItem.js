import React from "react";

const AccordionItem = ({id,title,isShow,desc,parent}) => {
  return (
    <div>
      <div className="accordion-header" id={`heading-${id}`}>
        <button
          className={`accordion-button ${isShow?'':'collapsed'}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-${id}`}
          aria-expanded={isShow?'true':'false'}
          aria-controls={`collapse-${id}`}
        >
          {title}
        </button>
      </div>
      <div
        id={`collapse-${id}`}
        className={`accordion-collapse collapse ${isShow?'show':''}`}
        aria-labelledby={`heading-${id}`}
        data-bs-parent={`#${parent}`}
      >
        <div className="accordion-body">
          <p>
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
