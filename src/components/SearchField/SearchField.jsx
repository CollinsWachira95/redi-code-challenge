import styles from "./SearchField.module.css";

const SearchField = ({ value, onChange }) => {
  
  return (
    <div className={styles.wrapper}>
      <input
        placeholder="Filter dishes..."
        type="text"
        value={value}  
        onChange={(e) => onChange(e.target.value) }   
      />
    </div>
  );
};

export default SearchField;