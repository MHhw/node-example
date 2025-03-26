// server/routes/userInfo/userInfoApi.js
import axios from 'axios';
import fs from 'fs';

const API_KEY = fs.readFileSync('../../api.txt', 'utf8').trim();
async function getMapleUserInfo(req, res) {
    
    let characterName = req.query.id;
    if (!characterName) {
        return res.status(400).json({ error: "characterName (search query) is required." });
    }

    //characterName = "명회";
    const idUrl = "https://open.api.nexon.com/maplestory/v1/id?character_name=" + encodeURIComponent(characterName);

    try {
        // 1️⃣ **캐릭터 OCID 조회**
        const idResponse = await axios.get(idUrl, {
            headers: { "x-nxopen-api-key": API_KEY },
        });

        let ocid = idResponse.data.ocid;
        if (!ocid) {
            throw new Error("OCID가 없습니다.");
        }

        console.log("OCID:", ocid);

        // 2️⃣ **캐릭터 기본 정보 조회 API**
        const characterInfoUrl = `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`;
        const characterInfoPromise = axios.get(characterInfoUrl, {
            headers: { "x-nxopen-api-key": API_KEY },
        });

        // 3️⃣ **캐릭터 장비 정보 조회 API**
        const equipmentUrl = `https://open.api.nexon.com/maplestory/v1/character/item-equipment?ocid=${ocid}`;
        const equipmentPromise = axios.get(equipmentUrl, {
            headers: { "x-nxopen-api-key": API_KEY },
        });

        // 3️⃣ ** 캐릭터 심볼 정보 조회 API **
        const symbolUrl = `https://open.api.nexon.com/maplestory/v1/character/symbol-equipment?ocid=${ocid}`;
        const symbolPromise = axios.get(symbolUrl, {
            headers: { "x-nxopen-api-key": API_KEY },
        });

        // 3️⃣ ** 캐릭터 펫 장비 정보 조회 API **
        const petEquipmentUrl = `https://open.api.nexon.com/maplestory/v1/character/pet-equipment?ocid=${ocid}`;
        const petEquipmentPromise = axios.get(petEquipmentUrl, {
            headers: { "x-nxopen-api-key": API_KEY },
        });
        
        // 4️⃣ ** API 요청 병렬 실행**
        const [characterInfoResponse, equipmentResponse, symbolResponse, petEquipmentResponse] = await Promise.all([
            characterInfoPromise,
            equipmentPromise,
            symbolPromise,
            petEquipmentPromise,
        ]);

        // 5️⃣ **API 응답 데이터에서 .data 참조**
        const characterData = characterInfoResponse.data;
        const equipmentData = equipmentResponse.data;
        const symbolData = symbolResponse.data;
        const petEquipmentData = petEquipmentResponse.data;

        const characterInfo = {
            character_name: characterData.character_name,
            world_name: characterData.world_name,
            character_gender: characterData.character_gender,
            character_class: characterData.character_class,
            character_class_level: characterData.character_class_level,
            character_level: characterData.character_level,
            character_exp: characterData.character_exp,
            character_exp_rate: characterData.character_exp_rate,
            character_guild_name: characterData.character_guild_name,
            character_image: characterData.character_image,
            character_date_create: characterData.character_date_create,
        };

        console.log("equipmentData:", equipmentData);

        const characterEquipmentInfo = {
            item_equipment: equipmentData.item_equipment
        };

        const characterSymbolInfo = {
            symbol: symbolData.symbol
        }

        let pet_1_equipment = petEquipmentData.pet_1_equipment || {};
        pet_1_equipment.category = "pet_1_equipment";

        let pet_2_equipment = petEquipmentData.pet_2_equipment || {};
        pet_2_equipment.category = "pet_2_equipment";

        let pet_3_equipment = petEquipmentData.pet_3_equipment || {};
        pet_3_equipment.category = "pet_3_equipment";

        const characterPetEquipmentInfo = {
            petEquip: [pet_1_equipment, pet_2_equipment, pet_3_equipment]
        }

        // 6️⃣ **최종 응답 데이터**
        const result = {
            characterInfo: characterInfo,
            characterEquipmentInfo: characterEquipmentInfo,
            characterSymbolInfo: characterSymbolInfo,
            characterPetEquipmentInfo: characterPetEquipmentInfo
        };

        console.log("***************");
        console.log("최종 응답 데이터:", result);
        console.log("***************");
        res.json(result);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
    
}

export { getMapleUserInfo };