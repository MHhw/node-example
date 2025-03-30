// client/src/components/UserEquipment.js

import React from "react";
import classNames from 'classnames';
import styles from './UserEquipment.module.css';

function UserEquipment({ characterEquipment, characterSymbol, characterPetEquipment }) {
    if (!characterEquipment) return <p>Loading equipment info...</p>;
    if (!characterSymbol) return <p>Loading symbol info...</p>;
    if (!characterPetEquipment) return <p>Loading pet info...</p>;

    console.log(characterEquipment);
    const equipmentCategories = [
        "반지4", "공백", "모자", "공백", "엠블렘",
        "반지3", "펜던트2", "얼굴장식", "공백", "뱃지",
        "반지2", "펜던트", "눈장식", "귀고리", "훈장",
        "반지1", "무기", "상의", "어깨장식", "보조무기",
        "포켓 아이템", "벨트", "하의", "장갑", "망토",
        "공백", "공백", "신발", "공백", "기계 심장"
    ];

    const categorizedItems = equipmentCategories.map((category, index) => {
        const specialIndexes = [1, 3, 8, 25, 26, 28];

        if (category === "공백") {
            return (
                <div key={index} className={classNames(styles.itemContainer, {[styles.noBorder]: specialIndexes.includes(index)})}>
                    <div className={styles.emptySlot}> </div>
                </div>
            );
        }

        const item = characterEquipment.item_equipment.find(item => item.item_equipment_slot === category);
        return (
            <div key={index} className={styles.itemContainer}>
                {item ? (
                    <img
                        src={item.item_shape_icon}
                        alt={`${category} 이미지`}
                        className={styles.itemImage}
                    />
                ) : (
                    <div className={styles.emptySlot}> </div>
                )}
            </div>
        );
    });

    const symbolCategories = [
        "아케인심볼 : 소멸의 여로", "아케인심볼 : 츄츄 아일랜드", "아케인심볼 : 레헬른",
        "아케인심볼 : 아르카나", "아케인심볼 : 모라스", "아케인심볼 : 에스페라",
        "어센틱심볼 : 세르니움", "어센틱심볼 : 아르크스", "어센틱심볼 : 오디움",
        "어센틱심볼 : 도원경", "어센틱심볼 : 아르테리아", "어센틱심볼 : 카르시온"
    ];

    const symbolItems = symbolCategories.map((category, index) => {
        const item = characterSymbol.symbol.find(item => item.symbol_name === category);
        return (
            <div key={index} className={styles.itemContainer}>
                {item ? (
                    <img
                        src={item.symbol_icon}
                        alt={`${category} 이미지`}
                        className={styles.itemImage}
                    />
                ) : (
                    <div className={styles.emptySlot}> </div>
                )}
            </div>
        );
    });


    const petEquipmentCategories = [
        "공백", "공백", "공백",
        "pet_1_equipment", "pet_2_equipment", "pet_3_equipment"
    ];

    const petEquipmentItems = petEquipmentCategories.map((category, index) => {
        const specialIndexes = [0, 1, 2];
        if (category === "공백") {
            return (
                <div key={index} className={classNames(styles.itemContainer, {[styles.noBorder]: specialIndexes.includes(index)})}>
                    <div className={styles.emptySlot}> </div>
                </div>
            );
        }

        const item = characterPetEquipment.petEquip.find(item => item.category === category);
        return (
            <div key={index} className={styles.itemContainer}>
                {item.item_name ? (
                    <img
                        src={item.item_shape_icon}
                        alt={`${category} 이미지`}
                        className={styles.itemImage}
                    />
                ) : (
                    <div className={styles.emptySlot}> </div>
                )}
            </div>
        );
    });

    return (
        <div className={styles.userEquipment}>
            <div className={styles.equipmentTitle}>🛡️ 장착 아이템 목록</div>
            <div className={styles.equipmentContainer}>
                <div className={styles.equipmentGrid}>
                    {categorizedItems}
                </div>
                <div className={styles.etcGrid}>
                    <div className={styles.symbolGrid}>
                        {symbolItems}
                    </div>
                    <div className={styles.petGrid}>
                        {petEquipmentItems}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default UserEquipment;

