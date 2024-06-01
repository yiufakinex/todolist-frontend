import '../styles/global.css';

const Footer = () => {
    return (
        <div className="footer">
            <span>Copyright © {new Date().getFullYear()}</span>
        </div>
    );
};

export default Footer;