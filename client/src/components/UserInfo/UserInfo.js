// client/src/components/UserInfo.js

import React from "react";
import classNames from 'classnames';
import styles from './UserInfo.module.css';

function UserInfo({ characterInfo }) {
    if (!characterInfo) return <p>Loading character info...</p>;

    /* 
        [characterInfo]
        character_class (직업) : "에반"
        character_class_level (전직차수) :  "6"
        character_date_create (생성일) :  "2015-11-12T00:00+09:00"
        character_exp (현재 경험치) :  64404297485698
        character_exp_rate (현재 경험치%) :  "64.720"
        character_gender (캐릭터 성별) :  "남"
        character_guild_name (길드명) : "Free"
        character_image (캐릭터 이미지) :  "https://open.api.nexon.com/static/maplestory/character/look/KFFHPPCIAJLOJHBAGNBKDODECILDHICNEIPGIHJGNGKJDBJKFNNJFBBDHALDJBJJFGBFNLCKDCIPFOJABKFNJPKBICCONBGLPBHHBNMICLMFPLJDIKHLFEFJIDKMABMLKDDMCDBFIKILIEFJJBHAPDIHCDKLJMNKNNIHIICLDMPMHIBLNEKDFDHCJANBFDLMJHGLCPLDAHHMLGCBHBIINOODKNHPGPOGLKFEGCIBPGBHFBPFIONLJJONCAFFCBIE"
        character_level (캐릭터 레벨) :  285
        character_name (캐릭터 명) :  "명회"
        world_name (월드명) :  "루나"
    */

    return (
        <div className={styles.userInfoContainer}>
            <div className={classNames(styles.userInfoTitle, {
                [styles.male]: characterInfo.character_gender === "남",
                [styles.female]: characterInfo.character_gender === "여"
            })} >
                {characterInfo.character_name}
            </div>

            <div className={styles.userInfoContent}>
                <div className={styles.userInfoImage}>
                    <img src={characterInfo.character_image} alt="캐릭터 이미지" />
                </div>
                <div className={styles.userInfoStatistic}>
                    <ul>
                        <li>
                            <span>{characterInfo.character_name}</span> {/* 닉네임 */}
                        </li>
                        <li>
                            <span>Lv</span>
                            <span>{characterInfo.character_level}</span> {/* 레벨 */}
                        </li>

                        <li>
                            <span>Lv</span>
                            <span>{characterInfo.character_level}</span> {/* 레벨 */}
                        </li>
                        <li>
                            <span>Lv</span>
                            <span>{characterInfo.character_level}</span> {/* 레벨 */}
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
