export const Section = ({ title, children }) => {
    return (
        <section className="section">
            <h2>{title}</h2>
            <div className="card-wrapper">
                {children}
            </div>
        </section>
    );
};
export default Section;