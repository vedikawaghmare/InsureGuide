import React from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <ul>
        <li><a href="/">{t('nav.home')}</a></li>
        <li><a href="/survey">{t('nav.survey')}</a></li>
        <li><a href="/recommendations">{t('nav.recommendations')}</a></li>
        <li><a href="/dashboard">{t('nav.dashboard')}</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;