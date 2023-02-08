import React, { useEffect, FC, useState, useCallback, useRef } from "react";
import { EpubView, ReactReader } from "react-reader";
//hooks
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Types
import { RootState } from "../../store/store";
import { Rendition } from "epubjs";

export const Books = () => {
    const [selections, setSelections] = useState("");
    const renditionRef = useRef<Rendition | null>(null);
    const navigate = useNavigate();
    const currentUser = useSelector((state: RootState) => state.user.currentUser);

    useEffect(() => {
        if (!currentUser) {
            navigate("/");
        }
    }, [currentUser]);

    useEffect(() => {
        if (renditionRef.current !== null) {
            function setRenderSelection(cfiRange: string) {
                renditionRef.current && setSelections(renditionRef.current.getRange(cfiRange).toString());
            }
            renditionRef.current.on("selected", setRenderSelection);

            return () => {
                renditionRef.current && renditionRef.current.off("selected", setRenderSelection);
            };
        }
    }, [setSelections, selections]);
    console.log(selections);
    return (
        <>
            <h1>home</h1>
            <div style={{ height: "100vh" }}>
                <ReactReader
                    location={0}
                    url={"../../books-data/Alice's_Adventures_in_Wonderland_by_Lewis_Carroll/pg11-images.epub"}
                    getRendition={(rendition) => {
                        renditionRef.current = rendition;

                        setSelections("");
                    }}
                />
            </div>
            {selections ? <h2 onClick={() => setSelections("")}>{selections}</h2> : null}
        </>
    );
};
