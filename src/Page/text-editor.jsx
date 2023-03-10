import { Box, Button, Center, Input, Pressable, Text } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  BsLink45Deg,
  BsTextLeft,
  BsTextRight,
  BsTextCenter,
  BsTypeBold,
  BsBlockquoteLeft,
} from "react-icons/bs";
import { GrGallery } from "react-icons/gr";
import { RiItalic } from "react-icons/ri";
import {
  AiOutlineUnorderedList,
  AiOutlineOrderedList,
  AiOutlinePlus,
  AiFillVideoCamera,
} from "react-icons/ai";
import { TbSocial } from "react-icons/tb";
import Modal from "../component/modal";

const TextEditor = () => {
  const [onOpen, setOnOpen] = useState(true);
  const [text, setText] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [modalList, setModalList] = useState(null);
  const [isButton, setIsButton] = useState("");
  const editorRef = useRef(null);
  const modalRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleButton = () => {
    setOnOpen(!onOpen);
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsClicked(false);
        setShowModal(false);
      }
    }

    if (isClicked || showModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isClicked, showModal]);

  const smallModalCss = {
    width: "277px",
    background: "white",
    boxShadow: "0px 1px 4px #00000014",
    borderRadius: "3px",
    opacity: 1,
  };
  const modifyText = (commander) => {
    setIsButton(commander);
    // if(commander === "bold" || commander === "italic"){setFocus()}
    document.execCommand(commander, false, commander);
    
  };

  const customButton = (img, text1, text2) => {
    return (
      <Pressable
        onPress={() => {
          setModalList(text1);
          setShowModal(true);
        }}
      >
        {({ isPressed, isHovered }) => {
          return (
            <Box
              px={3}
              py={1}
              display={"flex"}
              flexDirection={"row"}
              style={{
                backgroundColor: isPressed || isHovered ? "#E7F1E9" : "",

                transform: [
                  {
                    scale: isPressed ? 0.96 : 1,
                  },
                ],
              }}
            >
              <Box py={"2"}>{img}</Box>
              <Box pl={"2"}>
                <Text>{text1}</Text>
                <Text fontSize={9} color={"gray.400"}>
                  {text2}
                </Text>
              </Box>
            </Box>
          );
        }}
      </Pressable>
    );
  };

  const ButtonComponent = ({ buttonName, buttonId }) => {
    return (
      <button
        style={{
          border: 0,
          backgroundColor: isButton !== buttonName ? "white" : "#fafafa",
        }}
        onClick={() => modifyText(buttonName)}
      >
        {buttonId}
      </button>
    );
  };

  const handleContentClick = (event) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === "a") {
      window.open(target.href, "_blank");
    }
  };

  const handleTextChange = () => {
    const text = editorRef.current.innerText;
    const wordArray = text.trim().split(/\s+/);
    setWordCount(wordArray.length);
  };

  return (
    <Box backgroundColor={"#FAFAFA"} width={"100%"}>
      <Box
        borderColor={"#E7F1E9"}
        borderWidth={1}
        width={"2xl"}
        marginY={"24"}
        borderRadius={3}
        style={{ minHeight: "700px" }}
        marginX={"auto"}
      >
        
        <Box
          borderBottomColor={"#E7F1E9"}
          borderBottomWidth={1}
          height={"10"}
          width={"full"}
        />
        <Box width={"full"}>
          <Input
            placeholder="Add post title"
            borderColor={"light.50"}
            height={"12"}
            fontSize={"xl"}
            pt={2}
            placeholderTextColor={"#212121"}
            variant="unstyled"
            autoCapitalize="word"
            fontWeight={"bold"}
          />
        </Box>
        <Box width={"full"}>
          {onOpen ? (
            <Button
              variant="unstyled"
              width={"24"}
              paddingLeft={6}
              onPress={handleButton}
            >
              <Text color={"gray.400"}>Add content</Text>
            </Button>
          ) : (
            <Box>
              <Box
                width={"lg"}
                height={"12"}
                borderColor={"gray.300"}
                borderWidth={1}
                ml={3}
                borderRadius={"4"}
                flexDirection={"row"}
                bg={"white"}
              >
                <Box
                  w={"100%"}
                  h={"100%"}
                  borderRightColor={"gray.300"}
                  borderRightWidth={1}
                  flex={0.3}
                  alignItems={"center"}
                  justifyContent={"space-evenly"}
                  flexDirection={"row"}
                  cursor={"point"}
                >
                  <ButtonComponent buttonId={"Paragragh"} buttonName={"P"} />

                  <RiArrowDropDownLine size={25} color={"#343E37"} />
                </Box>
                <Box
                  w={"100%"}
                  h={"100%"}
                  borderRightColor={"gray.300"}
                  borderRightWidth={1}
                  flex={0.15}
                  alignItems={"center"}
                  justifyContent={"space-evenly"}
                  flexDirection={"row"}
                >
                  <Pressable
                    style={{
                      border: 0,
                      backgroundColor:
                        isButton !== "createLink" ? "white" : "#fafafa",
                    }}
                    onPress={() => {
                      setShowModal(true);
                      setIsButton("createLink");
                      setModalList("Social");
                    }}
                  >
                    {<BsLink45Deg size={20} color={"#343E37"} />}
                  </Pressable>
                  <Pressable
                    style={{
                      border: 0,
                      backgroundColor:
                        isButton !== "imaged" ? "white" : "#fafafa",
                    }}
                    onPress={() => {
                      setShowModal(true);
                      setIsButton("imaged");
                      setModalList("Picture");
                    }}
                  >
                    {<GrGallery size={15} color={"#343E37"} />}
                  </Pressable>
                </Box>
                <Box
                  w={"100%"}
                  h={"100%"}
                  borderRightColor={"gray.300"}
                  borderRightWidth={1}
                  flex={0.2}
                  alignItems={"center"}
                  justifyContent={"space-evenly"}
                  flexDirection={"row"}
                >
                  <ButtonComponent
                    buttonId={<BsTextLeft size={20} color={"#343E37"} />}
                    buttonName={"justifyLeft"}
                  />
                  <ButtonComponent
                    buttonId={<BsTextRight size={20} color={"#343E37"} />}
                    buttonName={"justifyRight"}
                  />
                  <ButtonComponent
                    buttonId={<BsTextCenter size={20} color={"#343E37"} />}
                    buttonName={"justifyCenter"}
                  />
                </Box>

                <Box
                  w={"100%"}
                  h={"100%"}
                  borderRightColor={"gray.300"}
                  borderRightWidth={1}
                  flex={0.15}
                  alignItems={"center"}
                  justifyContent={"space-evenly"}
                  flexDirection={"row"}
                >
                  <ButtonComponent
                    buttonId={<BsTypeBold size={20} color={"#343E37"} />}
                    buttonName={"bold"}
                  />
                  <ButtonComponent
                    buttonId={<RiItalic size={20} color={"#343E37"} />}
                    buttonName={"italic"}
                  />
                </Box>
                <Box
                  w={"100%"}
                  h={"100%"}
                  borderRightColor={"gray.300"}
                  borderRightWidth={1}
                  flex={0.2}
                  alignItems={"center"}
                  justifyContent={"space-evenly"}
                  flexDirection={"row"}
                >
                  <ButtonComponent
                    buttonId={
                      <AiOutlineUnorderedList size={20} color={"#343E37"} />
                    }
                    buttonName={"insertUnorderedList"}
                  />
                  <ButtonComponent
                    buttonId={
                      <AiOutlineOrderedList size={20} color={"#343E37"} />
                    }
                    buttonName={"insertOrderedList"}
                  />
                  <ButtonComponent
                    buttonId={<BsBlockquoteLeft size={20} color={"#343E37"} />}
                    buttonName={"indent"}
                  />
                </Box>
              </Box>

              <Box m={3}>
                <div
                  onClick={handleContentClick}
                  contentEditable="true"
                  ref={editorRef}
                  dangerouslySetInnerHTML={{ __html: text }}
                  style={{
                    minHeight: "120px",
                    width: "100%",
                    outline: "none",
                  }}
                  onInput={handleTextChange}
                />
                <Pressable
                  p={1}
                  width={6}
                  onPress={() => setIsClicked(!isClicked)}
                >
                  <Box bg={"#E7F1E9"} p={1} width={6} borderRadius={20}>
                    <AiOutlinePlus />
                  </Box>
                </Pressable>
                {isClicked && (
                  <Box ref={modalRef} style={smallModalCss} py={2}>
                    <Text color={"gray.400"} pl={3} fontSize={12}>
                      EMBEDS
                    </Text>
                    {customButton(
                      <GrGallery size={15} color={"#343E37"} />,
                      "Picture",
                      "jpeg, png"
                    )}
                    {customButton(
                      <AiFillVideoCamera size={15} color={"#343E37"} />,
                      "Videos",
                      "Embed a Youtube video"
                    )}
                    {customButton(
                      <TbSocial size={15} color={"#343E37"} />,
                      "Social",
                      "Embed a Facebook link"
                    )}
                  </Box>
                )}
              </Box>
              {showModal && (
                <Modal
                  onClose={() => {
                    setShowModal(false);
                  }}
                  modaleRef={modalRef}
                  editorRef={editorRef}
                  modalList={modalList}
                />
              )}
            </Box>
          )}
        </Box>
        {!showModal && !onOpen && (
          <Box w={"100%"} position={"absolute"} bottom={0} bg={"white"}>
            <Text p={2} pr={4} textAlign={"end"}>
              {wordCount}/1000 words
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TextEditor;
