
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useHelper } from '@react-three/drei'
import { a } from '@react-spring/web'
// import { Button, Alert } from 'react'
import { proxy, useSnapshot } from 'valtio'
import { HexColorPicker } from 'react-colorful'

import Wagon from './components/Wagon'
import Overlay from './components/Overlay.js'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { Col, Container, Row } from 'react-bootstrap'
import { ChildButton, Directions, FloatingMenu, MainButton } from 'react-floating-button-menu'
import MdAdd from '@material-ui/icons/Add'
import MdClose from '@material-ui/icons/Clear'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import HomeIcon from '@mui/icons-material/Home'

const state = proxy({
  current: null,
  items: {
    Poignet: "#968078",
    InterieurRoues: "#E7A259",
    Carrosserie: "#60E785",
    Escaliers: "#B2483A",
    Fenetre: "#18EFFF",
    Cheminet: "#968078",
    Toit: "#E76B00",
    Roues: "#63271F",
    CarosserieExterne: "#E7A259",
    Porte: "#B2483A",
    ToitExterne: "#B2483A",
    FenetreExterne: "#B2483A",
    Nuages: "#ffffff",
    Background: "#321D46"
  },
})

function Picker() {
  const snap = useSnapshot(state)

  return (
    <div style={{ display: snap.current ? 'block' : 'none' }}>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <h1>{snap.current}</h1>
    </div>
  )
}

const angleToRadians = (angleInDeg) => (Math.PI / 180) * angleInDeg;

const Light = () => {
  const light1 = useRef()
  const light2 = useRef()
  const light3 = useRef()
  const light4 = useRef()
  useHelper(light1, THREE.PointLightHelper, 1);
  useHelper(light2, THREE.PointLightHelper, 1);
  useHelper(light3, THREE.PointLightHelper, 1);
  useHelper(light4, THREE.PointLightHelper, 1);

  return (
    <>
      <pointLight args={[`#ffffff`, 1, 100]} position={[5, 10, 0]} />
      <pointLight args={[`#ffffff`, 0.5, 100]} position={[0, 6, -5]} />
      <pointLight args={[`#ffffff`, 0.5, 100]} position={[0, 6, 5]} />
      <pointLight args={[`#76AFFF`, 0.5, 100]} position={[0, 0, 0]} />
    </>
  )


}

export default function AppWagon() {
  const [isOpen, setIsOpen] = useState(false);
  document.body.classList.add('wagon-bg');

  return (
    <>
      <main >
        <Container>
          <Row>
            <Col sm={6} className=''>
              <div className='overlay'>

                <p className='just scroll c-scroll'>
                  <h2 className='just'>Le d??part</h2>
                  ?? compter de ce jour, l???id??e de partir ne quitta plus Tomek. Une nuit, il fit
                  un r??ve ??trange o?? la jeune fille ??tait poursuivie par des tigres qui couraient
                  sur leurs deux pattes de derri??re, comme des hommes. Elle l???appelait :
                  ?? Tomek ! Tomek ! ?? Il la prenait par la main et tous deux fuyaient ?? toutes
                  jambes. Ils entendaient claquer derri??re eux les m??choires des hommestigres,
                  mais ils leur ??chappaient au dernier moment en se cachant sous un
                  rocher. L??, Tomek demandait ?? la petite comment elle pouvait bien
                  conna??tre son nom et elle r??pondait en haussant les ??paules : ?? Mais tout le
                  monde te conna??t, Tomek ! ?? Dans un autre r??ve, il ??tait pench?? au-dessus
                  du bassin d???eau pure, tout en haut de la Montagne Sacr??e. Quelque chose
                  brillait au fond de l???eau, c?????tait le sou de la petite, celui avec lequel elle
                  avait pay?? le sucre d???orge. Il le prenait dans sa main et quand il se
                  retournait, elle ??tait l??, souriante, dans une robe de princesse. Et derri??re
                  elle, dompt??s, les hommes-tigres montaient la garde.<br/>
                  Tomek fixa son d??part un matin ?? l???aube. Ainsi on ne remarquerait pas
                  tout de suite son absence, et quand le vieil Icham trouverait sa lettre, dans
                  son ??choppe, il serait d??j?? loin.<br/>
                  Les derniers jours, il eut bien du mal ?? cacher son agitation et il lui
                  sembla qu???on le regardait dr??lement dans son ??picerie. Comme s???il avait
                  port?? sur lui la marque de son grand projet, comme si quelque chose le
                  trahissait, une lumi??re particuli??re dans les yeux, peut-??tre. Il s???interrogea
                  longuement sur les habits qu???il devait prendre. Ce n?????tait pas commode car
                  il n???avait aucune id??e de ce qui l???attendait en chemin. Ferait-il froid ou
                  chaud dans ces contr??es lointaines ? Fallait-il se munir de chaussettes de
                  laine, d???un ??pais pull-over et d???un passe-montagne ? Ou bien fallait-il au
                  contraire ??tre le plus l??ger possible pour ne pas ??tre embarrass?? ? Il ne savait
                  pas non plus quel mat??riel emporter avec lui. Il chercha des r??ponses dans
                  les quelques livres d???aventures qu???il aimait, mais il n???en trouva gu??re. La
                  plupart des aventuriers ne poss??daient rien et son pr??f??r??, Robinson Cruso??,
                  encore moins que les autres puisqu???il avait tout perdu au cours de son
                  naufrage. La jeune fille aux sucres d???orge n???avait rien non plus, semblait-il.
                  Aussi Tomek d??cida-t-il de suivre leur exemple et de n???emporter avec lui
                  que l???indispensable.<br/>
                  Il lui fallait d???abord une bonne couverture de laine car il devrait sans
                  doute dormir ?? la belle ??toile et les nuits seraient vite fra??ches.
                  Il avait ??galement besoin d???une gourde. Or, il en avait justement une en
                  peau de loutre. Il la fixerait solidement ?? sa ceinture et elle lui servirait pour
                  son usage personnel. Et aussi pour rapporter l???eau de la rivi??re Qjar. Si
                  jamais il la trouvait, naturellement.<br/>
                  Il confectionna lui-m??me, dans un tissu tr??s r??sistant, une pochette de
                  quelques centim??tres, pas plus, dans laquelle il logea la pi??ce de la jeune
                  fille. Ainsi il pourrait la lui rendre d??s qu???il la trouverait. Au cas bien s??r o??
                  il la retrouverait??? D???ici l??, la pochette resterait cach??e sous sa chemise,
                  attach??e ?? son cou par un cordon, et bien malin qui irait la lui prendre.
                  Dans les poches de son pantalon, il mit seulement un couteau ?? ours, au
                  cas o?? il aurait ?? se d??fendre, et deux mouchoirs sur lesquels sa m??re avait
                  autrefois brod?? le T de son pr??nom ?? lui, Tomek.<br/>
                  Le dernier soir, apr??s avoir v??rifi?? que ses affaires ??taient pr??tes, il
                  s???assit derri??re son comptoir, alluma sa lampe ?? huile et il ??crivit pour
                  Icham la lettre que voici.<br/>
                  Cher grand-p??re Icham,<br/>
                  Tu lis toujours les lettres des autres mais celle-ci est pour toi et tu
                  n???auras pas besoin de la lire ?? haute voix. Je sais que je vais te faire de
                  la peine et je te demande de me pardonner. Je suis parti ce matin pour
                  la rivi??re Qjar. Si j???y arrive, je te rapporterai de son eau. J???esp??re
                  retrouver en chemin la jeune fille dont je t???ai parl??, puisqu???elle va l??bas
                  aussi. Je te laisse la clef du magasin car l?? o?? je vais je risquerais
                  de la perdre. Je reviendrai le plus t??t possible.<br/>
                  ?? bient??t. Tomek.<br/>
                  Il eut du mal ?? retenir ses larmes en glissant la lettre dans l???enveloppe.
                  Icham avait bien vieilli ces derniers mois. Ses joues s?????taient creus??es. Ses
                  mains ressemblaient ?? de vieux parchemins. Serait-il encore vivant quand
                  Tomek reviendrait ? Et d???ailleurs, reviendrait-il un jour ? Il n???en ??tait pas s??r
                  du tout.<br/>
                  Il se coucha tout habill?? sur son lit et dormit quelques heures d???un
                  sommeil sans r??ves. Quand il se r??veilla, il faisait encore nuit et un rayon de
                  lune ??clairait faiblement l???arri??re-boutique. Il sauta sur ses deux pieds, le
                  coeur plein de joie. Ainsi c?????tait aujourd???hui ! Il lui sembla qu???il avait
                  patient?? une ??ternit?? et que le plus beau jour de sa vie ??tait enfin arriv??. Un
                  immense espoir l???envahit. Il trouverait la rivi??re Qjar, c?????tait certain. Il
                  escaladerait la Montagne Sacr??e. Il rapporterait l???eau. Il reverrait aussi la
                  jeune fille, bien s??r, et il lui rendrait son argent !<br/>
                  Il but un grand bol de chocolat et mangea de bon app??tit plusieurs
                  tartines de beurre et de confiture. Ensuite il s???habilla chaudement, v??rifia
                  que la gourde ??tait bien fix??e ?? sa ceinture, que la pochette ??tait bien ?? sa
                  place sous sa chemise et qu???il avait dans ses poches tout ce qu???il avait pr??vu
                  d???y mettre. Il y ajouta au dernier moment un bon morceau de pain. Pour
                  finir, il roula bien serr?? sa couverture de laine et l???attacha sur ses ??paules,
                  puis il alla ?? la porte de la boutique et l??, il fit ce qu???il n???avait jamais fait de
                  toute sa vie : il retourna la petite pancarte qui y ??tait accroch??e. D??sormais
                  elle indiquait : FERM??.<br/>
                  Tomek traversa les rues silencieuses du village jusqu????? l?????choppe du
                  vieil Icham. La toile ??tait tir??e. Il l?????carta sans bruit. Sur le pupitre
                  qu???Icham utilisait pour ??crire, Tomek d??posa la clef de l?????picerie,
                  l???enveloppe contenant sa lettre d???adieu et un gros morceau de nougat.
                  ?? Au revoir, grand-p??re??? ?? murmura-t-il encore, comme si le vieil
                  homme pouvait l???entendre. Puis il revint sur ses pas et jeta en passant un
                  dernier coup d???oeil ?? sa boutique. Il s???engagea enfin ?? grandes enjamb??es
                  sur ce chemin qu???il avait pris si souvent d??j??. Seulement, cette fois, il ne
                  ferait pas demi-tour. Cette fois, il s???en allait pour de bon. Il ??tait un
                  aventurier. Comme pour le saluer, un vol d???oies sauvages dessina tr??s haut
                  dans le ciel un triangle parfait. Elles allaient vers le sud, comme Tomek.
                  ?? J???arrive ! ?? leur lan??a-t-il, et sa poitrine se gonfla de bonheur.
                  En ces temps anciens, on avait de la g??ographie une id??e assez vague.
                  On se doutait bien que la terre ??tait ronde, mais beaucoup de gens n???en
                  ??taient finalement pas si convaincus. ?? Si la terre est ronde, disaient-ils, estce
                  que ceux qui sont en dessous ont donc la t??te en bas ? Et s???ils ne tombent
                  pas, est-ce parce qu???ils sont coll??s par leurs semelles ? ?? Il n???y avait ni
                  cartes pr??cises comme aujourd???hui, ni panneaux indicateurs. On se dirigeait
                  en observant le soleil, la lune, les ??toiles??? Et on se perdait assez souvent, il
                  faut bien le reconna??tre.<br/>
                  Tomek avait r??solu d???aller toujours vers le sud, l?? o?? se trouvait l???oc??an,
                  d???apr??s Icham. Une fois l??-bas, pensait-il, il serait bien temps de choisir la
                  droite ou la gauche pour t??cher de trouver la rivi??re Qjar. Pendant une
                  bonne partie de la journ??e, il marcha dans des paysages qui lui ??taient
                  familiers, de collines en plaines, s???arr??tant seulement pour manger un peu
                  de son pain, boire ?? sa gourde ou grappiller quelques fruits dans les arbres.
                  Mais au fur et ?? mesure que le soir venait, il lui sembla que l???horizon
                  s?????largissait et qu???il ??tait barr?? au loin par une sorte d???interminable trait noir
                  et horizontal. Quand il fut ?? quelques centaines de m??tres, il vit que c?????tait
                  une for??t, la plus grande qu???il e??t jamais vue. L???id??e de la traverser ne lui
                  plaisait qu????? moiti??, mais la contourner repr??senterait certainement
                  plusieurs journ??es de marche, plusieurs semaines, qui sait ? ?? chaque jour
                  suffit sa peine, se dit finalement Tomek, qui commen??ait ?? ressentir la
                  fatigue. Il revint donc un peu en arri??re, l?? o?? il avait remarqu?? un arbre
                  isol?? qui formait une sorte de parapluie, et dont les branches atteignaient
                  presque le sol. Il se glissa dessous et s???enroula dans sa couverture. Dans un
                  demi-sommeil, il pensa encore qu???il serait bon pour lui de trouver un
                  compagnon de route, que les aventuriers en avaient souvent un, et qu???il se
                  sentirait moins seul ainsi. Mais sa fatigue ??tait si grande qu???il s???endormit
                  avant m??me d???avoir eu le temps d???en ??prouver du chagrin.<br/>
                  <h2 className='just'>La for??t de l'oubli</h2>
                    Quand Tomek se r??veilla, il lui fallut quelques secondes pour r??aliser
                    qu???il n?????tait pas dans son lit. Mais en voyant le feuillage qui tombait en
                    cloche autour de lui, tout lui revint d???un coup : son d??part au petit jour, sa
                    longue marche dans la campagne, l???arbre isol??. Il ??tait donc vraiment parti.
                    Ce n?????tait pas un r??ve.<br/>
                    Un minuscule oiseau jaune et bleu, nich?? dans les feuilles, se mit ??
                    siffloter tout pr??s de lui et cela faisait : ?? Debout Tomek ! Debout Tomek ! ??
                    Il ne put s???emp??cher de rire. Il ressentait le m??me bonheur que le matin
                    pr??c??dent lorsqu???il avait quitt?? le village, le m??me sentiment de libert??, la
                    m??me all??gresse. Si c???est cela voyager, se dit-il, alors je veux bien faire
                    trois fois le tour du monde !<br/>
                    Il allait sortir de sa cachette quand il per??ut des bruits ??tranges ??
                    l???ext??rieur. Cela ressemblait ?? du papier qu???on froisse ou peut-??tre ?? des
                    brindilles qu???on entasse. Puis plusieurs claquements secs, comme si
                    quelqu???un avait cass?? des petites branches. Tomek, immobile, tendit
                    l???oreille. Au bout d???un moment, on souffla ?? plusieurs reprises. Pas de
                    doute, on allumait un feu. Tomek h??sita encore ?? sortir. Et si cette personne
                    ??tait dangereuse ? Si elle l???attaquait ? D???un autre c??t??, attendre qu???elle parte
                    risquait d?????tre tr??s long car on ne fait pas du feu pour s???en aller d??s qu???il a
                    pris. Il en ??tait l?? de ses r??flexions quand la voix se fit entendre.
                    Apparemment, c?????tait une femme. Elle chantonnait ?? voix basse :<br/>
                    Mon ??????ne, mon ??????ne,<br/>
                    A bien mal ?? sa patte???<br/>
                    Sans doute ne connaissait-elle pas la suite de la chanson car elle ne
                    faisait que reprendre cette premi??re phrase. Elle s???affairait, on entendait
                    maintenant des bruits de casseroles, badaglang, et d???eau qui coulait dedans.
                    Et toujours la chanson : ?? Mon ??ne, mon ??ne??? ?? Voil?? quelqu???un de bonne
                    humeur, pensa Tomek. Il se dit aussi qu???une personne qui chantait ?? Mon
                    ??ne, mon ??ne a bien mal ?? sa patte ?? ne pouvait pas ??tre tr??s m??chante et il
                    pointa le nez hors de sa cachette.<br/>
                    C?????tait une femme, en effet. Dr??lement accoutr??e peut-??tre mais c?????tait
                    une femme. Plut??t petite de taille mais tr??s ronde. Elle portait les uns sur les
                    autres une quantit?? de v??tements qui n???allaient pas ensemble. Par couches,
                    pourrait-on dire : une couche de bas de laine rapi??c??s, une couche de jupes,
                    une couche de pull-overs??? Elle ne risquait pas d???avoir froid. Pour parfaire
                    le tableau, elle ??tait coiff??e d???un bonnet qui lui couvrait les deux oreilles et
                    chauss??e de croquenots d???une taille impressionnante.<br/>
                    ??? Tiens, tiens ! La faim sort le loup du bois ! Tu aimes le caf?? ?<br/>
                    ??? Oui, bonjour, madame??? r??pondit Tomek qui n???en avait jamais bu.<br/>
                    La femme ??clata de rire en le voyant si timide.<br/>
                    ??? Oh, pour le madame ! Appelle-moi Marie, va, ??a suffira bien ! Et tiretoi
                    une pierre vers le feu si tu veux t???asseoir.<br/>
                    En contournant l???arbre ?? la recherche d???une pierre, Tomek vit qu???il y
                    avait l?? un ??ne qui broutait, et une carriole dont les deux bras pointaient
                    vers le ciel.<br/>
                    ??? C???est votre ??ne ? demanda-t-il en revenant.<br/>
                    ??? C???est Cadichon. Il est tr??s intelligent. Un peu t??tu mais tr??s
                    intelligent. Et vaillant surtout. Hein, Cadichon ?<br/>
                    L?????ne se redressa, inclina curieusement la t??te et regarda sa ma??tresse ??
                    travers une rang??e de poils qui lui tombaient sur les yeux. Puis il reprit son
                    repas.<br/>
                    ??? Il est borgne, ajouta la grosse femme. Les ours???<br/>
                    ??? Les ours ? fit Tomek en s???asseyant sur une pierre plate qu???il avait
                    rapport??e.<br/>
                    ??? Eh oui, les ours. La for??t en est infest??e.<br/>
                    ??? Ah bon??? dit Tomek, et il regarda au loin l???immense barre noire,
                    silencieuse et immobile.<br/>
                    Il se rendit compte qu???il l???avait presque oubli??e.<br/>
                    ??? Alors on ne peut pas la traverser ?<br/>
                    La grosse femme, qui ??tait en train de tailler une tartine dans une
                    ??norme miche de pain de seigle, arr??ta net son geste.<br/>
                    ??? Tu veux traverser la for??t ?<br/>
                    ??? Oui, fit Tomek, et il eut l???impression d???avoir dit une ??normit??.
                    Pour se corriger, il ajouta donc aussit??t :<br/>
                    ??? Ou bien, si ??a n???est pas possible, je ferai le tour???<br/>
                    ??? Tu feras le tour ? reprit la grosse femme, et elle partit d???un rire si gai
                    et si naturel que Tomek se mit ?? rire aussi.<br/>
                    Ils en rirent aux larmes tous les deux, surtout que Tomek, pour en
                    rajouter, r??p??tait de temps en temps : ?? Je ferai le tour??? ?? et la grosse
                    femme riait de plus belle en reprenant, comme si c?????tait une chose tout ??
                    fait ordinaire : ?? Bien s??r, tu feras le tour ! ??<br/>
                    Quand ils furent un peu calm??s, Marie alla vers la carriole et en rapporta
                    dans un panier une livre de beurre, deux pots de confiture, l???un de fraises,
                    l???autre de m??res, un gros morceau de fromage de brebis, du lait de vache
                    dans un petit bidon et une bo??te de sucre. Entre-temps, le caf?? ??tait pr??t et
                    tout chaud dans la casserole. Elle en versa ?? Tomek dans un gobelet, poussa
                    vers lui le panier de nourriture et l???invita ?? se servir sans fa??on. Ils
                    mang??rent en silence et de bon app??tit. Puis Marie roula une cigarette et
                    commen??a ?? la fumer, ce qui ??tonna bien Tomek qui n???avait jamais vu une
                    femme faire cela.<br/>
                    ??? Comment t???appelles-tu, au fait ? demanda enfin Marie en soufflant la
                    fum??e.<br/>
                    ??? Tomek, je m???appelle Tomek.<br/>
                    ??? Eh bien, Tomek, tu dois savoir que pour contourner cette for??t, pour
                    en ?? faire le tour ?? ??? et ils faillirent se remettre ?? rire ???, pour en faire le tour,
                    il faut sans doute plus de deux ans.<br/>
                    ??? Deux ans ! r??p??ta Tomek, stup??fait.<br/>
                    ??? Oui, cette for??t est la m??re de toutes les for??ts, c???est la plus ancienne
                    et la plus grande. En tout cas la plus longue. Tu sais comment elle
                    s???appelle ?<br/>
                    ??? Non, r??pondit Tomek.<br/>
                    ??? Elle s???appelle??? Cadichon !<br/>
                    Tomek crut un instant que la for??t s???appelait Cadichon, et il trouva que
                    le nom ??tait bien mal choisi pour une for??t aussi redoutable, mais non,
                    Marie s?????tait simplement interrompue pour appeler son ??ne.<br/>
                    ??? Cadichon ! Veux-tu un morceau de fromage pour ton dessert ?<br/>
                    L?????ne remua la queue, ce qui voulait dire oui sans doute car Marie se
                    leva pour le lui apporter.<br/>
                    ??? Elle s???appelle la For??t de l???Oubli. Et tu sais pourquoi ?<br/>
                    ??? Non, r??pondit Tomek, en se disant qu???il ne savait d??cid??ment pas
                    grand-chose.<br/>
                    ??? Elle s???appelle la For??t de l???Oubli parce qu???on oublie imm??diatement
                    ceux qui y entrent???<br/>
                    ??? Vous voulez dire???<br/>
                    ??? Tu peux me dire ?? tu ??, Tomek, je ne suis pas la reine d???Angleterre.<br/>
                    ??? Tu veux dire qu???ils ne reviennent plus et qu???on finit par les oublier ?<br/>
                    ??? Non. Pas du tout. Je veux dire qu???on les oublie d??s qu???ils y entrent.<br/>
                    Comme s???ils n???existaient plus, comme s???ils n???avaient jamais exist??. La for??t
                    les avale tout entiers, et avec eux le souvenir qu???on en a. Ils sortent ?? la fois
                    de notre vue et de notre m??moire. Tu comprends ?<br/>
                    ??? Pas tout ?? fait???<br/>
                    ??? Bon. Je vais te donner un exemple. Tes parents pensent sans doute ??
                    toi en ce moment, ils se demandent o?? tu es, ce que tu???<br/>
                    Tomek l???interrompit :<br/>
                    ??? Je n???ai plus de parents. Je suis orphelin.<br/>
                    ??? Bien, alors dis-moi le nom de quelqu???un qui te conna??t tr??s bien et
                    qui t???aime beaucoup.<br/>
                    Tomek n???eut pas ?? h??siter :<br/>
                    ??? Icham. C???est mon meilleur ami.<br/>
                    ??? Parfait. Cette personne pense donc certainement ?? toi en ce moment,
                    elle se demande si tu vas bien, ce que tu fais, quand tu vas revenir, non ?<br/>
                    ??? Si, certainement??? r??pondit Tomek, et son coeur se serra.<br/>
                    ??? Eh bien, d??s que tu auras mis un pied dans cette for??t, ??cham???<br/>
                    ??? I??? cham, la corrigea Tomek.<br/>
                    ??? Icham n???aura plus le moindre souvenir de toi. Pour lui, tu n???auras
                    jamais exist??, et si on lui demande des nouvelles de Tomek, ce qui est
                    d???ailleurs impossible puisque personne ne peut demander des nouvelles de
                    quelqu???un qui n???existe plus, mais admettons qu???on puisse le faire et donc
                    qu???on lui demande des nouvelles de Tomek, eh bien, il r??pondra : ?? Des
                    nouvelles de qui ? ?? Et cela aussi longtemps que tu resteras dans la for??t. ??
                    l???inverse, d??s que tu en sortiras, si tu en sors, tout sera comme avant et ton
                    ami Icham pourra se demander : ?? Tiens, et ce bandit de Tomek, qu???est-ce
                    qu???il peut bien fabriquer ?? l???heure qu???il est ? ??<br/>
                    ??? Et??? et si je n???en sors pas ? demanda faiblement Tomek.<br/>
                    ??? Si tu n???en sors pas, alors tu seras oubli?? pour l?????ternit??. Ton nom ne
                    dira rien ?? personne. Ce sera comme si tu n???avais pas v??cu.<br/>
                    Jamais Tomek n???aurait imagin?? qu???une chose aussi horrible puisse
                    exister. Il termina en silence sa tartine de beurre et son gobelet de caf??,
                    tandis que Marie finissait sa cigarette, et tout ?? coup il eut une id??e folle.
                    ??? Mais alors, Marie, si tu entrais tout de suite dans la for??t, d???un m??tre
                    seulement, tu n???existerais plus pour moi ?<br/>
                    ??? Exactement, Tomek. ??a t???amuserait d???essayer ?<br/>
                    Le mot ?? amuser ?? ne convenait pas vraiment. Cela lui faisait m??me un
                    peu peur, mais il accepta tout de m??me et tous les deux se h??t??rent de
                    ranger ce qui restait du petit d??jeuner et d?????teindre le feu. Puis Marie attela
                    la carriole ?? Cadichon comme ?? un vrai petit cheval. Ils saut??rent dedans et
                    elle lan??a :<br/>
                    ??? Hue, Cadichon !<br/>
                    L?????ne se mit ?? trotter en direction de la for??t et ils l???atteignirent en
                    quelques minutes. Tomek se demandait de plus en plus s???il avait vraiment
                    envie de faire cette dr??le d???exp??rience, mais d??j?? Marie le poussait hors de
                    la carriole.<br/>
                    ??? Voil??, je vais m???avancer de quelques m??tres dans la for??t avec
                    Cadichon. J???y resterai trois minutes environ puis je ressortirai. J???esp??re
                    seulement que tu n???auras pas l???id??e d???entrer ?? ton tour dans la for??t, car on
                    n???en aurait pas fini de se chercher. Ou plut??t de ne pas se chercher,
                    justement ! Quel ??ge as-tu, Tomek ?<br/>
                    ??? J???ai treize ans.<br/>
                    ??? Alors ??a va. Aucun enfant de treize n???oserait entrer tout seul dans
                    cette for??t. ?? tout ?? l???heure, Tomek ! Hue, Cadichon !<br/>
                    L?????ne se mit en marche, tirant la carriole, Marie fit un dernier signe du
                    bras et elle disparut entre les troncs noirs de la For??t de l???Oubli.
                    Tomek recula d???une dizaine de pas pour mieux voir l???impressionnant
                    mur d???arbres qui se dressait devant lui. C?????tait une vari??t?? de sapins tr??s
                    sombres et tr??s touffus, hauts de quatre-vingts m??tres au moins. Sans m??me
                    entrer dans la for??t, on en sentait la fra??cheur. Il doit faire bien noir l??dessous,
                    se dit Tomek avec inqui??tude. Il ??tait peut-??tre plus raisonnable de
                    contourner cette for??t, d???en faire le tour. ?? cette pens??e, il eut curieusement
                    envie de rire, et pourtant ce n?????tait pas dr??le. Perdre plusieurs jours ou
                    m??me plusieurs semaines n???avait rien de r??jouissant??? Si seulement il avait
                    eu avec lui un compagnon de voyage, ??videmment, il aurait vu les choses
                    d???une autre mani??re. ?? deux, on s???encourage, on s???entra??ne, on peut rire
                    ensemble, se porter secours s???il le faut. Or, depuis son d??part, il n???avait
                    rencontr?? personne. Et il avait fini par dormir sous cet arbre l??-bas, tout
                    seul, enroul?? dans sa couverture. Sa couverture ! Il avait oubli?? sa
                    couverture !<br/>
                    Il courut ?? toutes jambes vers l???arbre et plongea sous les branches. Ouf !
                    Elle ??tait encore l??. Il se promit d?????tre plus vigilant d??sormais. Un
                    aventurier ne doit pas perdre ses affaires, surtout quand il en a si peu. Ce
                    n???est qu???en sortant de sa cachette qu???il vit les restes d???un feu tout pr??s de
                    l???arbre. Il aurait pourtant jur?? qu???il n???y avait rien la veille quand il ??tait
                    arriv?? l??. Et personne n?????tait venu depuis. Voil?? qui ??tait bien ??trange.
                    Il roula la couverture sur ses ??paules et fit quelques pas en direction de
                    la for??t. Apr??s tout, elle n?????tait peut-??tre pas aussi grande que cela. En
                    partant tout de suite et en marchant d???un bon pas, il en serait sorti avant
                    midi peut-??tre, au plus tard avant la nuit. Et en cas de mauvaise rencontre, il
                    avait son couteau ?? ours dans sa poche.<br/>
                    Avant d???entrer dans la for??t, il eut une derni??re h??sitation car il lui vint ??
                    l???esprit qu???il n???avait rien mang?? au petit d??jeuner et qu???il aurait sans doute
                    besoin de toutes ses forces. Or, il constata avec surprise qu???il n???avait pas
                    faim et qu???il se sentait m??me tout ?? fait rassasi??. Allons ! se dit-il, et il
                    s???avan??a avec d??termination vers la for??t.<br/>
                    Il allait y p??n??trer quand il entendit des branches craquer tout pr??s de l??.
                    ??tait-ce un animal ? Un ??tre humain ? Le bruit se rapprochait. Tomek recula
                    vivement et se coucha dans les herbes hautes pour voir ce qui allait surgir
                    de l???obscurit??. Ce qu???il vit, ce furent d???abord deux oreilles d?????ne, puis une
                    t??te d?????ne, puis un ??ne tout entier, enfin une carriole tir??e par l?????ne et sur la
                    carriole une grosse femme souriante. Rassur??, il se redressa.<br/>
                    ??? Alors, Tomek ! La m??moire te revient ? lui lan??a joyeusement Marie.<br/>
                    Tomek se pr??cipita vers la carriole. Marie, qui en ??tait descendue, lui
                    tendit les bras. Tomek n???osa pas s???y jeter parce qu???ils ne se connaissaient
                    pas encore assez bien. Il se contenta de lui prendre les mains et de les serrer.
                    C???est ainsi qu???ils devinrent amis.<br/>

                  <h2 className='just'>La suite arrive prochainement...</h2>
                </p>

              </div>
            </Col>
            <Col sm={6}>
        <Canvas className="canvas" dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 75 }}>
          {/*<ambientLight intensity={0.5} />*/}
          {/*<spotLight position={[0, 0, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />*/}
          <directionalLight intensity={0.5} />
          <Light/>
          {/* <PresentationControls global rotation={[0, 0.3, 0]} polar={[-Math.PI / 3, Math.PI / 3]} azimuth={[-Math.PI / 1.4, Math.PI / 2]}> */}
          <Wagon state={state} />
          <OrbitControls
            maxAzimuthAngle={Math.PI}
            maxPolarAngle={Math.PI}
            minAzimuthAngle={-Math.PI / 2}
            minPolarAngle={0}
            enableZoom={true}
            enablePan={false}
            minDistance={0}
            maxZoom={10}
            minZoom={-1}
            zoomSpeed={0.5}
          />
          {/* </PresentationControls> */}
          {/*<ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />*/}
          {/*<Environment preset="city" />*/}
        </Canvas>
        <Picker />
            </Col>
          </Row>
          <FloatingMenu
            slideSpeed={500}
            isOpen={isOpen}
            spacing={20}
            direction={Directions.Up}
            className="menu-btn"
          >
            <MainButton
              isOpen={isOpen}
              iconResting={<MdAdd style={{ fontSize: 20 }} />}
              iconActive={<MdClose style={{ fontSize: 20 }} />}
              background="white"
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
              size={56}
            />
            <ChildButton
              icon={<ChevronLeftIcon style={{ fontSize: 20 }} />}
              background="white"
              onClick={()=>window.location.href = "chapitre-2"}
              size={40}
            />
            <ChildButton
              icon={<ChevronRightIcon style={{ fontSize: 20 }} />}
              background="grey"
              size={40}
            />
            <ChildButton
              icon={<HomeIcon style={{ fontSize: 20 }} />}
              background="white"
              onClick={()=>window.location.href = "/"}
              size={40}
            />
          </FloatingMenu>
        </Container>
      </main>
      {/*<Button*/}
      {/*  title="Suivant"*/}
      {/*  color="#ff0000"*/}
      {/*  onPress={() => {*/}
      {/*    window.location.replace('https://2nkzth.csb.app/')*/}
      {/*  }}*/}
      {/*/>*/}
    </>
  )
}
