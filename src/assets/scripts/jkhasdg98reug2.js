const pathname = window.location.pathname;
const hashname = window.location.hash;
const brandID = pathname.replace(/^\/|\/$/g, "");
const tagID = hashname.substring(1);

const ctaLink1 = document.getElementById("lenk_1");
const ctaLink2 = document.getElementById("lenk_2");
const ctaLink3 = document.getElementById("lenk_3");
const ctaLink4 = document.getElementById("lenk_4");

const CMS_API_URI = "https://bora-jogar-server-game-cms.vercel.app";

async function getmycta() {
  try {
    const response = await fetch(`${CMS_API_URI}/api/consume/records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author_username: "sceiiya" }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const API_DETAILS = data.records.filter(
      (api) => api.game_title === "cassino-slots"
      // (api) => api.game_title === "cassino-online"
    );
    return API_DETAILS;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function changeCtaLink() {
  try {
    const result = await getmycta();
    // const recorded = result.records;

    const records = result.map((record) => ({
      brand: record.category,
      id: record.tag_identifier,
      country: record.country,
      cta_link: record.link,
      image: record.brand_image,
    }));

    const matchedObject = records.find((record) => record.id === tagID);

    const ctaLink = matchedObject
      ? matchedObject.cta_link
      : "https://bj88php.site/af/f20v1r5A/minigame";

    return ctaLink;
  } catch (error) {
    console.error("Error in cas:", error);
    throw error;
  }
}

async function setCtaLink() {
  try {
    const link = await changeCtaLink();
    ctaLink1.href = link;
    ctaLink2.href = link;
    ctaLink3.href = link;
    ctaLink4.href = link;
  } catch (error) {
    console.error("Error setting CTA link:", error);
  }
}

setCtaLink();
