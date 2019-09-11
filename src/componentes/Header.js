import React from 'react'
import PropTypes from 'prop-types'


const Header = (props) => {
  const prevent = '#'
    return (
      <div>
        <nav>
          <div className="nav-wrapper light-blue darken-2">
            <a  href={prevent} className="brand-logo">{props.titulo}</a>
            
           </div>
          </nav>
      </div>  
    )
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
}

export default Header;
