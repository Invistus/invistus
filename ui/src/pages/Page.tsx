import React, { useEffect } from 'react';
import './Page.css';

interface PageProps {
  title?: string;
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, children }) => {

  // Set the document title if a title prop is passed
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <div className="page-container">
      {children}
    </div>
  );
}

export default Page;
