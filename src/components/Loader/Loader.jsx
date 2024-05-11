import React from 'react';
import { Circles } from 'react-loader-spinner'; 
import css from "./Loader.module.css";

function Loader() {
  return (
    <div className={css.loader}>
      <Circles type="Puff" color="#00BFFF" height={60} width={60} />
    </div>
  );
}
// className={styles.loader}
export default Loader;