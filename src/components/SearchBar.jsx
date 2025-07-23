import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

// Import data with error handling
let services = [];
let doctors = [];

try {
  services = require('../data/json/ServiceDetails.json') || [];
} catch (error) {
  console.error('Error loading services data:', error);
  services = [];
}

try {
  const doctorsData = require('../data/doctors');
  doctors = doctorsData?.doctors || [];
} catch (error) {
  console.error('Error loading doctors data:', error);
  doctors = [];
}

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Handle search when query changes
  useEffect(() => {
    try {
      if (query.trim().length > 2) {
        const lowerCaseQuery = query.toLowerCase().trim();

        const filteredServices = (services || []).filter(service => 
          service?.name && 
          typeof service.name === 'string' && 
          service.name.toLowerCase().includes(lowerCaseQuery)
        );

        const filteredDoctors = (doctors || []).filter(doctor => 
          doctor?.name && 
          typeof doctor.name === 'string' && 
          doctor.name.toLowerCase().includes(lowerCaseQuery)
        );

        const combinedResults = [
          ...(filteredServices || []).map(service => ({
            ...service,
            id: service.id || service._id || Math.random().toString(36).substr(2, 9),
            type: 'service',
            name: service.name || 'Unnamed Service'
          })),
          ...(filteredDoctors || []).map(doctor => ({
            ...doctor,
            id: doctor.id || doctor._id || Math.random().toString(36).substr(2, 9),
            type: 'doctor',
            name: doctor.name || 'Unnamed Doctor'
          }))
        ];

        setResults(combinedResults);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error in search:', error);
      setResults([]);
    }
  }, [query]);

  const handleSearch = () => {
    if (!query.trim()) return;
    
    // If there are results, navigate to the first one
    if (results.length > 0) {
      handleSelect(results[0]);
      return;
    }
    
    // If no results but query exists, navigate to search results page
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelect = (item) => {
    if (!item) return;
    
    try {
      if (item.type === 'service') {
        navigate(`/service/${item.id || ''}`);
      } else if (item.type === 'doctor') {
        navigate(`/doctor/${item.id || ''}`);
      }
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setQuery('');
      setResults([]);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search for services, doctors..."
          style={styles.input}
        />
        <button 
          onClick={handleSearch}
          style={styles.searchButton}
          aria-label="Search"
        >
          <FaSearch style={styles.searchIcon} />
        </button>
      </div>
      {isFocused && query.length > 0 && results.length > 0 && (
        <div style={styles.resultsContainer}>
          <ul style={styles.resultsList}>
            {results.slice(0, 5).map((item, index) => (
              <li 
                key={`${item.type}-${item.id || index}`} 
                onClick={() => handleSelect(item)} 
                style={styles.resultItem}
              >
                <span style={styles.resultText}>
                  {item.name}
                  <span style={styles.itemType}>
                    {item.type === 'doctor' ? ' (Doctor)' : ' (Service)'}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
    fontFamily: 'inherit',
  },
  searchContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    width: '100%',
    padding: '12px 50px 12px 20px',
    borderRadius: '30px',
    border: '1px solid #e2e8f0',
    fontSize: '16px',
    outline: 'none',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    height: '50px',
    '&:focus': {
      borderColor: '#f04e30',
      boxShadow: '0 0 0 3px rgba(240, 78, 48, 0.2)',
    },
  },
  searchButton: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    color: '#f04e30',
    fontSize: '18px',
  },
  resultsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1000,
    marginTop: '8px',
  },
  resultsList: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    padding: '8px 0',
    margin: 0,
    listStyle: 'none',
    maxHeight: '400px',
    overflowY: 'auto',
    border: '1px solid #e2e8f0',
  },
  resultItem: {
    padding: '12px 20px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderBottom: '1px solid #f1f5f9',
    '&:last-child': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: '#f8fafc',
    },
  },
  resultText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#1e293b',
    fontSize: '15px',
  },
  itemType: {
    color: '#64748b',
    fontSize: '13px',
    marginLeft: '12px',
    backgroundColor: '#f1f5f9',
    padding: '2px 8px',
    borderRadius: '12px',
    fontWeight: 500,
  },
};

// Add this to your global CSS or in a style tag in the component
const globalStyles = `
  @media (max-width: 768px) {
    .search-container {
      width: 100%;
      max-width: 100%;
    }
    
    .search-input {
      font-size: 16px !important; /* Prevents zoom on mobile */
    }
  }
`;

// Add the styles to the document head
const styleElement = document.createElement('style');
styleElement.textContent = globalStyles;
document.head.appendChild(styleElement);

export default SearchBar;
