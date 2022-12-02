import { useEffect, useState } from 'react';

const useSeller = (email) => {
    const [seller, setSeller] = useState(false);
    const [sellerLoading, setSellerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/${email}`)
                .then((res) => res.json())
                .then((data) => {
                    setSeller(data.isSeller);
                    setSellerLoading(false);
                });
        }
    }, [email]);
    return [seller, sellerLoading];
};

export default useSeller;
