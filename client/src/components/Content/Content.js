// src/components/Content.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import UserInfo from "../UserInfo/UserInfo";
import UserEquipment from "../UserEquipment/UserEquipment";
import styles from './Content.module.css';

function Home({ searchQuery }) {
    const [characterInfo, setCharacterInfo] = useState(null);
    const [characterEquipment, setCharacterEquipment] = useState(null);
    const [characterSymbol, setCharacterSymbol] = useState(null);
    const [characterPetEquipmentInfo, setCharacterPetEquipmentInfo] = useState(null);

    // 서버 API 호출 함수
    useEffect(() => {
        if (searchQuery.trim() === "") return;

        const fetchMapleId = async () => {
            try {
                const response = await axios.get("http://localhost/userInfo/getMapleUserInfo", { params: { id: searchQuery } });
                // console.log("서버 응답:", response.data);

                let characterInfo = response.data.characterInfo;
                let characterEquipmentInfo = response.data.characterEquipmentInfo;
                let characterSymbolInfo = response.data.characterSymbolInfo;
                let characterPetEquipmentInfo = response.data.characterPetEquipmentInfo

                //console.log("characterInfo:", characterInfo);
                //console.log("characterEquipmentInfo:", characterEquipmentInfo);
                //console.log("characterSymbolInfo:", characterSymbolInfo);
                //console.log("characterPetEquipmentInfo:", characterPetEquipmentInfo);

                setCharacterInfo(characterInfo);
                setCharacterEquipment(characterEquipmentInfo);
                setCharacterSymbol(characterSymbolInfo);
                setCharacterPetEquipmentInfo(characterPetEquipmentInfo);

            } catch (error) {
                console.error("Error fetching Maple ID:", error);
            }
        };

        fetchMapleId();
    }, [searchQuery]);

    return (
        <div className={styles.contentContainer}>
            <div className={styles.userContainer}>
                <UserInfo characterInfo={characterInfo} />
                <UserEquipment characterEquipment={characterEquipment} characterSymbol={characterSymbol} characterPetEquipment={characterPetEquipmentInfo} />
            </div>
        </div>
    );
}

export default Home;
