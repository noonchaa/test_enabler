const Card = ({ children }) => {
    return (
        <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 mx-auto">
            {children}
        </div>
    )
}

export default Card