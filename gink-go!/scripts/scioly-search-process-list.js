// NEEDS NODE.JS FOR THIS
// Convert to format - Scientific Name: Family (don't use Scientific Name (Family) )

const fs = require('node:fs');
const path = require('path');

var rawList = `
Ginkgoaceae: Ginkgo Family
Ginkgo biloba (Ginkgo)
Taxaceae: Yew Family
Taxus brevifolia (Pacific Yew)
Pinaceae: Pine Family
Abies balsamea (Balsam Fir)
Abies concolor (White Fir)
Abies grandis (Grand Fir)
Abies lasiocarpa (Subalpine Fir)
Larix laricina (Tamarack)
Larix occidentalis (Western Larch)
Picea engelmannii (Engelmann Spruce)
Picea glauca (White Spruce)
Picea mariana (Black Spruce)
Picea pungens (Blue Spruce)
Picea rubens (Red Spruce)
Picea sitchensis (Sitka Spruce)
Pinus attenuata (Knobcone Pine)
Pinus banksiana (Jack Pine)
Pinus contorta (Lodgepole Pine)
Pinus echinata (Shortleaf Pine)
Pinus edulis (Colorado Pinyon Pine)
Pinus lambertiana (Sugar Pine)
Pinus palustris (Longleaf Pine)
Pinus ponderosa (Ponderosa Pine)
Pinus resinosa (Red Pine)
Pinus rigida (Pitch Pine)
Pinus strobus (Eastern White Pine)
Pinus taeda (Loblolly Pine)
Pseudotsuga menziesii (Douglas-fir)
Tsuga canadensis (Eastern Hemlock)
Tsuga heterophylla (Western Hemlock)
Tsuga mertensiana (Mountain Hemlock)
Cupressaceae: Cypress Family
Chamaecyparis lawsoniana (Port-Orford Cedar)
Cupressus macrocarpa (Monterey Cypress)
Juniperus osteosperma (Utah Juniper)
Juniperus scopulorum (Rocky Mountain Juniper)
Juniperus virginiana (Eastern Redcedar)
Sequoia sempervirens (Redwood)
Sequoiadendron giganteum (Giant Sequoia)
Taxodium distichum (Baldcypress)
Thuja occidentalis (Northern White-cedar)
Thuja plicata (Western Redcedar)
Arecaceae: Palm Family
Sabal palmetto (Cabbage Palmetto)
Washingtonia filifera (California Fan Palm)
Salicaceae: Willow Family
Populus alba (White Poplar)
Populus angustifolia (Narrowleaf Cottonwood)
Populus balsamifera (Balsam Poplar)
Populus deltoides (Eastern Cottonwood)
Populus grandidentata (Bigtooth Aspen)
Populus tremuloides (Quaking Aspen)
Salix bebbiana (Bebb Willow)
Salix nigra (Black Willow)
Salix scouleriana (Scouler Willow)
Juglandaceae: Walnut Family
Carya cordiformis (Bitternut Hickory)
Carya glabra (Pignut Hickory)
Carya illinoinensis (Pecan)
Carya ovata (Shagbark Hickory)
Juglans cinerea (Butternut)
Juglans nigra (Black Walnut)
Betulaceae: Birch Family
Alnus rubra (Red Alder)
Betula alleghaniensis (Yellow Birch)
Betula lenta (Sweet Birch)
Betula nigra (River Birch)
Betula occidentalis (Water Birch)
Betula papyrifera (Paper Birch)
Betula populifolia (Gray Birch)
Carpinus caroliniana (American Hornbeam)
Ostrya virginiana (Eastern Hophornbeam)
Fagaceae: Beech Family
Castanea dentata (American Chestnut)
Fagus grandifolia (American Beech)
Notholithocarpus densiflorus (Tanoak)**
Quercus agrifolia (Coast Live Oak)
Quercus alba (White Oak)
Quercus chrysolepis (Canyon Live Oak)
Quercus douglasii (Blue Oak)
Quercus falcata (Southern Red Oak)
Quercus garryana (Oregon White Oak)
Quercus kelloggii (California Black Oak)
Quercus macrocarpa (Bur Oak)
Quercus palustris (Pin Oak)
Quercus phellos (Willow Oak)
Quercus montana (Chestnut Oak)**
Quercus rubra (Northern Red Oak)
Quercus velutina (Black Oak)
Quercus virginiana (Live Oak)
Cannabaceae: Hemp Family
Celtis occidentalis (Northern Hackberry)
Ulmaceae: Elm Family
Ulmus americana (American Elm)
Ulmus rubra (Slippery Elm)
Moraceae: Mulberry Family
Maclura pomifera (Osage-orange)
Morus alba (White Mulberry)
Morus rubra (Red Mulberry)
Magnoliaceae: Magnolia Family
Liriodendron tulipifera (Yellow-poplar)
Magnolia grandiflora (Southern Magnolia)
Magnolia macrophylla (Bigleaf Magnolia)
Annonaceae: Custard Apple Family
Asimina triloba (Common Pawpaw)
Lauraceae: Laurel Family
Sassafras albidum (Sassafras)
Umbellularia californica (California-laurel)
Hamamelidaceae: Witch-Hazel Family
Hamamelis virginiana (Witch-hazel)
Altingiaceae: Sweetgum Family
Liquidambar styraciflua (Sweetgum)
Platanaceae: Sycamore Family
Platanus occidentalis (American Sycamore)
Platanus racemosa (California Sycamore)
Rosaceae: Rose Family
Amelanchier alnifolia (Western Serviceberry)
Cercocarpus ledifolius (Curl-leaf Mountain Mahogany)
Heteromeles arbutifolia (Toyon)
Prunus americana (American Plum)
Prunus emarginata (Bitter Cherry)
Prunus pensylvanica (Pin Cherry)
Prunus serotina (Black Cherry)
Prunus virginiana (Common Chokecherry)
Pyrus calleryana (Bradford Pear)
Sorbus americana (American Mountain-ash)
Fabaceae: Legume Family
Albizia julibrissin (Silktree)
Cercis canadensis (Eastern Redbud)
Gleditsia triacanthos (Common Honeylocust)
Gymnocladus dioicus (Kentucky Coffeetree)
Parkinsonia florida (Blue Paloverde)
Prosopis glandulosa (Honey Mesquite)
Robinia pseudoacacia (Black Locust)
Vachellia farnesiana (Sweet Acacia)
Rutaceae: Rue Family
Zanthoxylum clava-herculis (Hercules’-club)
Simaroubaceae: Quassia Family
Ailanthus altissima (Ailanthus)
Anacardiaceae: Cashew/Sumac Family
Rhus glabra (Smooth Sumac)
Rhus typhina (Staghorn Sumac)
Aquifoliaceae: Holly Family
Ilex opaca (American Holly)
Ilex vomitoria (Holly/Yaupon)
Sapindaceae: Maple Family
Acer macrophyllum (Bigleaf Maple)
Acer negundo (Box Elder)
Acer platanoides (Norway Maple)
Acer rubrum (Red Maple)
Acer saccharinum (Silver Maple)
Acer saccharum (Sugar Maple)
Hippocastanaceae: Buckeye Family
Aesculus californica (California Buckeye)
Aesculus glabra (Ohio Buckeye)
Malvaceae: Mallow Family
Tilia americana (American Basswood)
Cactaceae: Cactus Family *
Carnegiea gigantea (Saguaro) *
Agavaceae: Yucca Family *
Yucca brevifolia (Joshua Tree) *
Myrtaceae: Myrtle Family
Eucalyptus globulus (Bluegum Eucalyptus)
Cornaceae: Dogwood Family
Cornus florida (Flowering Dogwood)
Cornus nuttallii (Pacific Dogwood)
Nyssaceae: Tupelo Family
Nyssa sylvatica (Black Tupelo)
Ericaceae: Heath Family
Arbutus menziesii (Pacific Madrone)
Ebenaceae: Ebony Family
Diospyros virginiana (Common Persimmon)
Oleaceae: Olive Family
Fraxinus americana (White Ash)
Fraxinus latifolia (Oregon Ash)
Fraxinus pennsylvanica (Green Ash)
Fraxinus velutina (Velvet Ash)
Bignoniaceae: Bignonia Family
Catalpa bignonioides (Southern Catalpa)
Catalpa speciosa (Northern Catalpa)
Chilopsis linearis (Desert-willow)
Paulowniaceae: Paulownia Family
Paulownia tomentosa (Princess-tree)
Adoxaceae: Muskroot Family
Sambucus nigra (American Elderberry)
Euphorbiaceae: Spurge Family *
Aleurites moluccanus (Candlenut) *
Triadica sebifera (Chinese Tallow) *
`;

var dict = {};
var famList = [];
rawListToDict(rawList);

fs.writeFile(path.join(__dirname,"treesDict.json"), JSON.stringify(dict), (err) => console.log(err)); 
fs.writeFile(path.join(__dirname,"famList.json"), JSON.stringify(famList), (err) => console.log(err)); 

function rawListToDict(raw) {
    const familyDelimiter = "Family";
    const lines = raw.split("\n");

    let currentFamily = "";

    const treeNameRegex = /^([\w\s]+)\s*\((.+)\)/;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '') continue;
        if (lines[i].includes(familyDelimiter)) {
            currentFamily = lines[i].trim().split(familyDelimiter)[0] + familyDelimiter; // trim, then remove everything after Family
            famList.push(currentFamily);
            dict[currentFamily] = [];
        }
        else {
            const lineRaw = lines[i].trim();
            const matches = lineRaw.match(treeNameRegex);
            if (lines[i] === "Aleurites moluccanus (Candlenut) *") {
                console.log(lineRaw);
                console.log(matches);
            }
            if (matches) { // Only perform if matches Scientific Name (Common Name) format.
                const scientificName = matches[1].trim();
                const commonName = matches[2].trim();
                dict[currentFamily].push({commonName: commonName, scientificName: scientificName});
            }
        }
    }
}