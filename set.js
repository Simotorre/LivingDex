const setObj = {
    // WotC / Base ERA
    'Base Set': 'base1',
    'Jungle': 'base2',
    'Fossil': 'base3',
    'Base Set 2': 'base4',
    'Team Rocket': 'base5',
    'Gym Heroes': 'gym1',
    'Gym Challenge': 'gym2',
    'Neo Genesis': 'neo1',
    'Neo Discovery': 'neo2',
    'Neo Revelation': 'neo3',
    'Neo Destiny': 'neo4',
    'Legendary Collection': 'base6',
    'Expedition Base Set': 'ecard1',
    'Aquapolis': 'ecard2',
    'Skyridge': 'ecard3',
    // Special (WotC)
    'Southern Islands': 'si1',

    // EX ERA (main)
    'EX Ruby & Sapphire': 'ex1',
    'EX Sandstorm': 'ex2',
    'EX Dragon': 'ex3',
    'EX Team Magma vs Team Aqua': 'ex4',
    'EX Hidden Legends': 'ex5',
    'EX FireRed & LeafGreen': 'ex6',
    'EX Team Rocket Returns': 'ex7',
    'EX Deoxys': 'ex8',
    'EX Emerald': 'ex9',
    'EX Unseen Forces': 'ex10',
    'EX Delta Species': 'ex11',
    'EX Legend Maker': 'ex12',
    'EX Holon Phantoms': 'ex13',
    'EX Crystal Guardians': 'ex14',
    'EX Dragon Frontiers': 'ex15',
    'EX Power Keepers': 'ex16',
    // (trainer kit già elencati più sotto)

    // DP ERA (main)
    'Diamond & Pearl': 'dp1',
    'DP Mysterious Treasures': 'dp2',
    'DP Secret Wonders': 'dp3',
    'DP Great Encounters': 'dp4',
    'DP Majestic Dawn': 'dp5',
    'DP Legends Awakened': 'dp6',
    'DP Stormfront': 'dp7',

    // Platinum ERA (main)
    'Platinum': 'pl1',
    'PL Rising Rivals': 'pl2',
    'PL Supreme Victors': 'pl3',
    'PL Arceus': 'pl4',

    // HGSS ERA (main)
    'HeartGold SoulSilver': 'hgss1',
    'HS Unleashed': 'hgss2',
    'HS Undaunted': 'hgss3',
    'HS Triumphant': 'hgss4',
    'Call of Legends': 'col1',

    // BW ERA (main)
    'Black & White': 'bw1',
    'BW Emerging Powers': 'bw2',
    'BW Noble Victories': 'bw3',
    'BW Next Destinies': 'bw4',
    'BW Dark Explorers': 'bw5',
    'BW Dragons Exalted': 'bw6',
    'BW Boundaries Crossed': 'bw7',
    'BW Plasma Storm': 'bw8',
    'BW Plasma Freeze': 'bw9',
    'BW Plasma Blast': 'bw10',
    'BW Legendary Treasures': 'bw11',
    // Special (BW)
    'BW Dragon Vault': 'dv1',

    // XY ERA (main)
    'XY Kalos Starter Set': 'xy0',
    'XY': 'xy1',
    'XY Flashfire': 'xy2',
    'XY Furious Fists': 'xy3',
    'XY Phantom Forces': 'xy4',
    'XY Primal Clash': 'xy5',
    'XY Roaring Skies': 'xy6',
    'XY Ancient Origins': 'xy7',
    'XY BREAKThrough': 'xy8',
    'XY BREAKPoint': 'xy9',
    'XY Fates Collide': 'xy10',
    'XY Steam Siege': 'xy11',
    'XY Evolutions': 'xy12',
    // Special (XY)
    'XY Double Crisis': 'dc1',
    'XY Generations': 'gen',

    // SM ERA (main)
    'Sun & Moon': 'sm1',
    'SM Guardian Rising': 'sm2',
    'SM Burning Shadows': 'sm3',
    'SM Crimson Invasion': 'sm4',
    'SM Ultra Prism': 'sm5',
    'SM Forbidden Light': 'sm6',
    'SM Celestial Storm': 'sm7',
    'SM Lost Thunder': 'sm8',
    'SM Team Up': 'sm9',
    'SM Unbroken Bonds': 'sm10',
    'SM Unified Minds': 'sm11',
    'SM Cosmic Eclipse': 'sm12',
    // Special (SM)
    'Shining Legends': 'sm35',
    'Dragon Majesty': 'drm',
    'Detective Pikachu': 'det',
    'Hidden Fates': 'hif',

    // SWSH ERA (main)
    'Sword & Shield': 'swsh1',
    'SWSH Rebel Clash': 'swsh2',
    'SWSH Darkness Ablaze': 'swsh3',
    'SWSH Vivid Voltage': 'swsh4',
    'SWSH Battle Styles': 'swsh5',
    'SWSH Chilling Reign': 'swsh6',
    'SWSH Evolving Skies': 'swsh7',
    'SWSH Fusion Strike': 'swsh8',
    'SWSH Brilliant Stars': 'swsh9',
    'SWSH Astral Radiance': 'swsh10',
    'SWSH Lost Origin': 'swsh11',
    'SWSH Silver Tempest': 'swsh12',
    // Special (SWSH)
    "Champion's Path": 'cpa',
    'Shining Fates': 'swsh45',
    'Celebrations': 'cel',
    'Pokémon GO': 'pgo',
    'Crown Zenith': 'swsh12pt5',

    // SV ERA (main)
    'Scarlet & Violet': 'sv1',
    'SV Paldea Evolved': 'sv2',
    'SV Obsidian Flames': 'sv3',
    'SV Paradox Rift': 'sv4',
    'SV Temporal Forces': 'sv5',
    'SV Twilight Masquerade': 'sv6',
    'SV Stellar Crown': 'sv7',
    'SV Surging Sparks': 'sv8',
    'SV Journey Together': 'sv9',
    'SV Destined Rivals': 'sv10',
    // Special (SV)
    'SV 151': 'sv151',
    'SV Paldean Fates': 'paf',
    'SV Shrouded Fable': 'sfa',
    'SV Prismatic Evolutions': 'pse',
    'SV Black Bolt': 'zsv10pt5',
    'SV White Flare': 'rsv10pt5',

    // MEGA EVOLUTION ERA (main)
    'Mega Evolution': 'me1',
    'ME Phantasmal Flames': 'me2',
    'ME Ascended Heroes': 'me2pt5',
    'ME Perfect Order': 'me3',
    'ME Chaos Rising': 'me4',
    'ME Pitch Black': 'me5',


    // Trainer Kit 
    'EX Trainer Kit Latias Half Deck': 'tk1a',
    'EX Trainer Kit Latios Half Deck': 'tk1b',
    'XY Trainer Kit - Noivern': 'tk6n',

    // Black Star Promos 
    'BW Black Star Promos': 'bwp',
    'XY Black Star Promos': 'xyp',
    'SM Black Star Promos': 'smp',
    'SWSH Black Star Promos': 'swshp',
    'SV Black Star Promos': 'svp'
};


export { setObj };