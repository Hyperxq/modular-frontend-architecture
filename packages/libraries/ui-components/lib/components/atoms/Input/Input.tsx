

const Input = () => {
  // Ensure an id is provided for accessibility (associating label with input

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        // Spread the rest of the HTML input attributes (type, value, onChange, etc.)
        style={{
          width: '100%',
          padding: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
    </div>
  );
};

export default Input;
