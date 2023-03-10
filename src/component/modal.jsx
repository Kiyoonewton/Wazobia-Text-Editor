import {
  Box,
  Center,
  HStack,
  Input,
  Pressable,
  Switch,
  Text,
} from "native-base";
import React, { useState, useRef } from "react";
import { AiFillCaretDown } from "react-icons/ai";

export default function Modal({
  isOpen,
  onClose,
  modaleRef,
  editorRef,
  modalList,
  size = "small",
}) {
  const [youtubeInput, setYoutubeInput] = useState("");
  const [modalContent1, setModalContent2] = useState({
    head: "Video",
    body: "Youtube",
  });

  const modeRef = useRef(null);

  const largeModalCss = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 9,
  };

  const centerModalCss = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
    backgroundColor: "fff",
    width: "666px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "4px",
    opacity: 1,
    paddingHorizontal: 18,
    paddingVertical: 15,
  };
  const inputStyle = {
    backgroundColor: "#fafafa",
    padding: 7,
    borderRadius: 4,
    marginTop: 8,
    alignItems: "center",
    borderColor: "green",
    borderWidth: "1px",
    borderStyle: "dashed",
    height: "121px",
    // display: "none",
    display: "flex",
  };

  const changeValue = (e) => {
    if (modalList === "Picture") {
      setYoutubeInput(e.target.files[0]);
      console.log(modalList);
    } else {
      setYoutubeInput(e.target.value);
    }
  };

  function setFocus() {
    const editor = editorRef.current;
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(editor);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    editor.focus();
  }

  function handleInsertImage() {
    if (modalList === "Picture") {
      const file = youtubeInput;
      const reader = new FileReader();
      reader.onload = () => {
        const imgElement = document.createElement("img");
        imgElement.setAttribute("src", reader.result);
        imgElement.setAttribute("alt", "image");
        imgElement.setAttribute("style", "width: 100%; height: auto;");

        //set focus to the last line
        setFocus();

        //pass the image into document.execCommand
        document.execCommand("insertHTML", false, imgElement.outerHTML);
        
      };
      reader.readAsDataURL(file);
      onClose();
    }
    if (modalList === "Videos") {
      const videoId = youtubeInput.split("v=")[1];
      const iframe = document.createElement("iframe");
      iframe.width = "99%";
      iframe.height = "315";
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.frameborder = "0";
      iframe.allowfullscreen = true;

      //set focus to the last line
      setFocus();

      //pass the video into document.execCommand
      document.execCommand("insertHTML", false, iframe.outerHTML);
      onClose();
    }
    if (modalList === "Social") {
      setFocus();

      document.execCommand(
        "insertHTML",
        false,
        `<a href=${youtubeInput} style={{textDecoration:"none", cursor: "pointer"}} target="_blank">Follow me on social media!</a>`
      );
      onClose();
    }
  }

  const stringifyData =
    youtubeInput !== "" &&
    `<iframe width="100%" height="315" src=${youtubeInput} title="YouTube" />`;
  const imgData =
    youtubeInput !== "" &&
    `<img width="100%" height="auto" src=${youtubeInput.name} type=${youtubeInput.type} alt="File Image"/>`;

  return (
    <Box style={largeModalCss}>
      <Box ref={modaleRef} style={centerModalCss}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent="space-between"
        >
          <Text fontWeight={"bold"}>Embed</Text>
          <Pressable onPress={onClose}>
            <Text color={"black"} fontSize={"14"}>
              x
            </Text>
          </Pressable>
        </Box>
        <Box>
          <Text pt={"3"} color={"gray.500"} fontSize={10}>
            {modalList === "Picture"
              ? "Upload Image"
              : modalList === "Videos"
              ? "VIDEO PROVIDER"
              : "SOCIAL MEDIA PLATFORM"}
          </Text>
        </Box>
        {modalList !== "Picture" && (
          <Box
            backgroundColor={"#fafafa"}
            p={2}
            borderRadius={4}
            mt={2}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text color={"gray.600"} fontSize={12}>
              {modalList === "Videos"
                ? modalContent1.body
                : "Social Media link"}
            </Text>
            <AiFillCaretDown size={6} />
          </Box>
        )}
        <Box>
          <Text pt={"3"} color={"gray.500"} fontSize={10}>
            {modalList === "Picture" ? "FILE UPLOAD" : "URL"}
          </Text>
        </Box>

        {modalList !== "Picture" ? (
          <Input
            backgroundColor={"gray.100"}
            p={2}
            borderRadius={4}
            mt={2}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            color={"gray.600"}
            fontSize={12}
            placeholder={
              modalList === "Picture"
                ? "Insert Image"
                : modalList === "Videos"
                ? "Input your youtube link"
                : "Input your social link"
            }
            outlineColor={"none"}
            value={youtubeInput}
            onChange={changeValue}
          />
        ) : (
          <div style={inputStyle}>
            <div
              style={{
                cursor: "pointer",
                borderColor: "green",
                borderWidth: "1px",
                borderRadius: "4px",
                textAlign: "center",
                borderStyle: "solid",
                padding: "8px",
                width: "146px",
                fontSize: "12px",
                margin: "auto",
                justifyContent: "center",
              }}
              onClick={() => {
                modeRef.current.click();
              }}
            >
              Import image from Device
            </div>
            <input
              ref={modeRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              outlineColor={"none"}
              onChange={changeValue}
            />
          </div>
        )}
        {youtubeInput && (
          <>
            <Box>
              <Text pt={"3"} color={"gray.500"} fontSize={10}>
                CODE
              </Text>
            </Box>
            <Box
              backgroundColor={"gray.100"}
              p={2}
              borderRadius={4}
              mt={2}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              style={{ textDecoration: "none" }}
            >
              <Text color={"gray.600"} fontSize={12}>
                {modalList === "Picture"
                  ? imgData
                  : modalList === "Videos"
                  ? stringifyData
                  : `<a href=${youtubeInput} target="_blank" >Follow me on social media!</a>`}
              </Text>
            </Box>
            <HStack alignItems="center" justifyContent="space-between">
              <Box>
                <Text pt={"3"} color={"gray.500"} fontSize={10}>
                  Disable caption
                </Text>
              </Box>
              <Box pt={2}>
                <Switch colorScheme="green" size="sm" />
              </Box>
            </HStack>
          </>
        )}
        <HStack pt={3}>
          <Pressable onPress={handleInsertImage}>
            <Box bg={"green.800"} borderRadius={3} mr={2}>
              <Text py={1} px={3} color={"white"}>
                Embed
              </Text>
            </Box>{" "}
          </Pressable>
          <Pressable onPress={onClose}>
            {" "}
            <Box borderColor={"gray.300"} borderWidth={1} borderRadius={3}>
              <Text py={1} px={3}>
                Cancel
              </Text>
            </Box>{" "}
          </Pressable>
        </HStack>
      </Box>
    </Box>
  );
}
