function Header({title, subtitle}: { title: string | undefined, subtitle?: string | undefined }) {
    return (
        <div>
            <h2 className='h2-bold text-dark-600'>
                {title}
            </h2>
            {subtitle && <p className='p-16-regular mt-4'>
                {subtitle}
            </p>}
        </div>
    );
}

export default Header;