import { useEffect } from "react";

const useClickOutsideClose = (nodeRef, popupCloser) => {
  useEffect(() => {
    // handles what happens on clicks - on outside click it closes popup, otherwise does nothing
    const popupClicksHandler = (event) => {
      if (!nodeRef?.current?.contains(event.target)) {
        popupCloser();
      }
    };
    // listens for click/mousedown events and invokes the handler on each event
    document.addEventListener("mousedown", popupClicksHandler);

    // clears the event listener after the popup is closed
    return () => document.removeEventListener("mousedown", popupClicksHandler);
  }, []);

  return nodeRef;
};

export default useClickOutsideClose;
