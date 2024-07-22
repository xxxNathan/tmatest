import { createContext, useContext, useState } from "react";

const InviteCodeContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const InviteCodeProvider = ({ children }) => {
  const [inviteCode, setInviteCode] = useState(null);

  return (
    <InviteCodeContext.Provider value={{ inviteCode, setInviteCode }}>
      {children}
    </InviteCodeContext.Provider>
  );
};

export const useInviteCode = () => {
  return useContext(InviteCodeContext);
};
