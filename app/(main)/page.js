import React from 'react';
import Image from "next/image";
const photoimg = "/img/ESL.jpg";

const DashboardPage = () => {
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    
                    <Image
                        priority={true}
                        alt="ESL"
                        src={photoimg}
                        width={1600}
                        height={475}
                        sizes="100vw"
                        style={{
                            objectFit: 'contain',
                            width: "100%",
                            height: "auto",
                        }}
                    /><h5>Welcome</h5>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
