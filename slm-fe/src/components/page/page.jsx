import styles from './styles.scss';

const Page = ({
  children,
}) => {
  return (
    <div className={styles.panelBackground}>
      <div className={styles.panel}>
        {children}
      </div>
    </div>
  );
};

export default Page;