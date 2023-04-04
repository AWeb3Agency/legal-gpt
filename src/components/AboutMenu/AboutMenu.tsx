import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import PopupModal from '@components/PopupModal';
import AboutIcon from '@icon/AboutIcon';
import qrcode from '../../assets/qr-code/qr-code-aw3a.png';

const AboutMenu = () => {
  const { t } = useTranslation(['main', 'about']);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <a
        className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm'
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <div>
          <AboutIcon />
        </div>
        {t('about')}
      </a>
      {isModalOpen && (
        <PopupModal
          title={t('about') as string}
          setIsModalOpen={setIsModalOpen}
          cancelButton={false}
        >
          <div className='p-6 border-b border-gray-200 dark:border-gray-600'>
            <div className='min-w-fit text-gray-900 dark:text-gray-300 text-sm flex flex-col gap-3 leading-relaxed'>
              <p>{t('description', { ns: 'about' })}</p>
              <p>
                <Trans
                  i18nKey='sourceCode'
                  ns='about'
                  components={[
                    <a
                      href='https://github.com/ztjhz/FreeChatGPT'
                      target='_blank'
                      className='link'
                    />,
                  ]}
                />
              </p>

              <p>
                <Trans
                  i18nKey='initiative.description'
                  ns='about'
                  components={[
                    <a
                      href={t('initiative.link', { ns: 'about' }) as string}
                      target='_blank'
                      className='link'
                    />,
                  ]}
                />
              </p>

              <>
                <h2 className='text-lg font-bold'>
                  {t('support.title', { ns: 'about' })}
                </h2>
                <p>{t('support.paragraph1', { ns: 'about' })}</p>
                <p>
                  <Trans
                    i18nKey='support.paragraph2'
                    ns='about'
                    components={[
                      <a
                        href='https://github.com/ztjhz/FreeChatGPT'
                        target='_blank'
                        className='link'
                      />,
                    ]}
                  />
                </p>
                <p>{t('support.paragraph3', { ns: 'about' })}</p>

                <div className='flex flex-col items-center gap-4 my-4'>
                  <div className='flex gap-x-10 gap-y-4 flex-wrap justify-center'>
                    <div className='flex flex-col items-center justify-center gap-1'>
                      <div>{t('support.website', { ns: 'about' })} (🧑🏽‍💻)</div>
                      <img
                        className='rounded-md w-32 h-32'
                        src={ qrcode }
                        alt='Support us'
                      />
                    </div>
                  </div>
                </div>
                <p>{t('support.paragraph4', { ns: 'about' })}</p>
              </> 

              <h2 className='text-lg font-bold'>
                {t('privacyStatement.title', { ns: 'about' })}
              </h2>
              <p>{t('privacyStatement.paragraph1', { ns: 'about' })}</p>

              <p>{t('privacyStatement.paragraph2', { ns: 'about' })}</p>
            </div>
          </div>
        </PopupModal>
      )}
    </>
  );
};

export default AboutMenu;
