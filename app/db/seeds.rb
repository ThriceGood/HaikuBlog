# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
# re-seed with: rails db:seed:replant

# Haiku data borrowed from: https://haiku-json-db.herokuapp.com/

kobayashi = User.create(username: 'Kobayashi Issa', email: 'issa@mail.com')
matsuo = User.create(username: 'Matsuo Basho', email: 'basho@mail.com')
yosa = User.create(username: 'Yosa Buson', email: 'buson@mail.com')

kobayashis_posts = [
  "A sudden shower falls -\nand naked I am riding\non a naked horse.",
  "Summer shower -\nnaked horse\na naked rider.",
  "A frog and I,\neyeball to eyeball.\nMy empty face,\nbetrayed by lightening.",
  "Cool breeze,\ntangled\nin a grass-blade.",
  "Step by step\nup a summer mountain -\nsuddenly: the sea.",
  "Cries of wild geese,\nrumors spread about me.",
  "Stillness -\nclouds peak\nin the lake.",
  "Just by being,\nI'm here -\nin the snow-fall.",
  "Showering\nonto Mount Kiso,\nthe Milky Way.",
  "What a moon -\nif only my grumbling wife\nwere here.",
  "In this windy nest\nopen your hungry\nmouth in vain... \nIssa, stepchild bird",
  "On the death of his child:\nDew evaporates\nand all our world\nis dew...  So dear,\nSo fresh, so fleeting",
  "A gate made all of twigs\nWith woven grass\nFor hinges... \nFor a lock...  This snail",
  "Arise from sleep, old cat,\nand with great yawns\nand stretchings... \nAmble out for love",
  "Hi! My little hut\nis newly-thatched\nI see... \nBlue morning-glories",
  "Dim the grey cow comes\nmooing mooing\nand mooing\nOut of the morning mist",
  "What a peony... \ndemanding to be\nmeasured\nBy my little fan!",
  "A nursemaid scarecrow... \nfrightening the\nwind and sun\nFrom playing baby",
  "A saddening world:\nflowers whose sweet\nblooms must fall... \nAs we too, alas... ",
  "Hi! Kids mimicking\ncormorants...  You are\nmore like\nReal cormorants than\nThey!",
  "Over the mountain\nbright the full white\nmoon now smiles... \nOn the flower-thief",
  "Good friend grasshopper\nwill you play\nthe caretaker\nFor my little grave?",
  "Giddy grasshopper\ntake care...  Do not\nleap and crush\nThese pearls of dewdrop",
  "Now be a good boy\ntake good care of\nour house... \nCricket my child",
  "Good evening breeze!\ncrooked and\nmeandering\nYour homeward journey",
  "The turnip farmer rose\nand with a fresh-\npulled turnip... \nPointed to my road",
  "I am going out... \nbe good and play\ntogether\nMy cricket children",
  "If strangers threaten\nturn into fat\ngreen bullfrogs... \nPond-cooling melons",
  "Live in simple faith... \njust as this\ntrusting cherry\nFlowers, fades, and falls",
  "Oh do not swat them... \nunhappy flies\nforever\nWringing their thin hands",
  "In the city fields\ncontemplating\ncherry-trees... \nStrangers are like friends",
  "Yellow autumn moon... \nunimpressed\nthe scarecrow stands\nSimply looking bored",
  "Cruel autumn wind\ncutting to the\nvery bones... \nOf my poor scarecrow",
  "I must turn over... \nbeware of local\nearthquakes\nBedfellow cricket!",
  "Visiting the graves... \ntrotting on to show\nthe way... \nOld family dog",
  "Before boiled chestnuts\ncross-legged lad\nis squatting... \nCarved wooden Buddha",
  "Nice: wild persimmons... \nand notice how\nthe mother\nEats the bitter parts",
  "What a gorgeous one\nthat fat sleek huge\nold chestnut\nI could not get at... ",
  "Oh former renter\nI know it all, all... \ndown to\nThe very cold you felt",
  "Plume of pampas grass\ntrembling\nin every wind... \nHush, my lonely heart",
  "Considerate dogs... \nstepping off\ninto the snow\nAs I walk the path",
  "Buddha on the hill... \nfrom your holy\nnose indeed\nHangs an icicle",
  "The orphan speaks:\nthe year-end party... \nI am even envious\nOf scolded children"
]

matsuos_posts = [
  "None is travelling\nHere along this way but I,\nThis autumn evening.",
  "The first day of the year:\nthoughts come - and there is loneliness;\nthe autumn dusk is here.",
  "An old pond\nA frog jumps in -\nSplash!",
  "Old dark sleepy pool... \nquick unexpected\nfrog\nGoes plop! Watersplash!",
  "Lightening -\nHeron's cry\nStabs the darkness",
  "Clouds come from time to time -\nand bring to men a chance to rest\nfrom looking at the moon.",
  "In the cicada's cry\nThere's no sign that can foretell\nHow soon it must die.",
  "Poverty's child -\nhe starts to grind the rice,\nand gazes at the moon.",
  "Won't you come and see\nloneliness? Just one leaf\nfrom the kiri tree.",
  "Temple bells die out.\nThe fragrant blossoms remain.\nA perfect evening!",
  "Ballet in the air ...\ntwin butterflies\nuntil, twice white\nThey meet, they mate",
  "Black cloudbank broken\nscatters in the\nnight ... Now see\nMoon-lighted mountains!",
  "Seek on high bare trails\nsky-reflecting\nviolets...\nMountain-top jewels",
  "For a lovely bowl\nlet us arrange these\nflowers...\nSince there is no rice",
  "Now that eyes of hawks\nin dusky night\nare darkened... \nChirping of the quails",
  "April's air stirs in\nwillow-leaves... \na butterfly\nFloats and balances",
  "In the sea-surf edge\nmingling with\nbright small shells ..\nBush-clover petals",
  "The river\nGathering may rains\nfrom cold streamlets\nfor the sea... \nMurmuring Mogami",
  "White cloud of mist\nabove white\ncherry-blossoms... \nDawn-shining mountains",
  "Twilight whippoorwill... \nwhistle on,\nsweet deepener\nOf dark loneliness",
  "Mountain-rose petals\nfalling, falling,\nfalling now... \nWaterfall music",
  "Ah me! I am one\nwho spends his little\nbreakfast\nMorning-glory gazing",
  "Seas are wild tonight... \nstretching over\nSado Island\nSilent clouds of stars",
  "Why so scrawny, cat?\nstarving for fat fish\nor mice... \nOr backyard love?",
  "Dewdrop, let me cleanse\nin your brief\nsweet waters... \nThese dark hands of life",
  "Glorious the moon... \ntherefore our thanks\ndark clouds\nCome to rest our necks",
  "Under cherry-trees\nsoup, the salad,\nfish and all... \nSeasoned with petals",
  "Too curious flower\nwatching us pass,\nmet death... \nOur hungry donkey",
  "Cloud of cherry-bloom... \ntolling twilight\nbell...  Temple\nUeno? Asakura?",
  "Must springtime fade?\nthen cry all birds... \nand fishes\nCold pale eyes pour tears",
  "Such utter silence!\neven the crickets'\nsinging... \nMuffled by hot rocks",
  "Swallow in the dusk... \nspare my little\nbuzzing friends\nAmong the flowers",
  "Reply:\nBright red pepper-pod... \nit needs but shiny\nwings and look... \nDarting dragon-fly!",
  "Wake! The sky is light!\nlet us to the road\nagain... \nCompanion butterfly!",
  "Silent the old town... \nthe scent of flowers\nfloating... \nAnd evening bell",
  "Camellia-petal\nfell in silent dawn... \nspilling\nA water-jewel",
  "In the twilight rain\nthese brilliant-hued\nhibiscus... \nA lovely sunset",
  "Lady butterfly\nperfumes her wings\nby floating\nOver the orchid",
  "Now the swinging bridge\nis quieted\nwith creepers... \nLike our tendrilled life",
  "The sea darkening... \noh voices of the\nwild ducks\nCrying, whirling, white",
  "Nine times arising\nto see the moon... \nwhose solemn pace\nMarks only midnight yet",
  "Here, where a thousand\ncaptains swore grand\nconquest...  Tall\nGrass their monument",
  "Now in sad autumn\nas I take my\ndarkening path... \nA solitary bird",
  "Will we meet again\nhere at your\nflowering grave... \nTwo white butterflies?",
  "Dry cheerful cricket\nchirping, keeps\nthe autumn gay... \nContemptuous of frost",
  "First white snow of fall\njust enough to bend\nthe leaves\nOf faded daffodils",
  "Carven gods long gone... \ndead leaves alone\nforegather\nOn the temple porch",
  "Cold first winter rain... \npoor monkey,\nyou too could use\nA little woven cape",
  "No oil to read by... \nI am off to bed\nbut ah!... \nMy moonlit pillow",
  "This snowy morning\nthat black crow\nI hate so much... \nBut he's beautiful!",
  "If there were fragrance\nthese heavy snow-\nflakes settling... \nLilies on the rocks",
  "See: surviving suns\nvisit the ancestral\ngrave... \nBearded, with bent canes",
  "Death-song:\nFever-felled half-way,\nmy dreams arose\nTo march again... \nInto a hollow land"
]

yosas_posts = [
  "Standing still at dusk\nlisten...  In far\ndistances\nThe song of froglings!",
  "My two plum trees are\nso gracious... \nsee, they flower\nOne now, one later",
  "The laden wagon runs\nbumbling and creaking\ndown the road... \nThree peonies tremble",
  "Lightning flash, crash... \nwaiting in the\nbamboo grove\nSee three dew-drops fall",
  "Afternoon shower... \nwalking and talking\nin the street:\nUmbrella and raincoat!",
  "Sadness at twilight... \nvillain! I have\nlet my hand\nCut that peony",
  "In dim dusk and scent\na witness\nnow half hidden... \nEvenfall orchid",
  "Voices of two bells\nthat speak from\ntwilight temples... \nAh! Cool dialogue",
  "Deep in dark forest\na woodcutter's\ndull axe talking... \nAnd a woodcutter",
  "Butterfly asleep\nfolded soft on\ntemple bell... \nThen bronze gong rang!",
  "See the morning breeze\nruffling his so\nsilky hair... \nCool caterpillar",
  "A camellia\ndropped down into\nstill waters\nOf a deep dark well",
  "In the holy dusk\nnightingales begin\ntheir psalm... \nGood! The dinner-gong!",
  "A short summer night... \nbut in this solemn\ndarkness\nOne peony bloomed",
  "Pebbles shining clear,\nand clear\nsix silent fishes... \nDeep autumn water",
  "A bright autumn moon... \nin the shadow of\neach grass\nAn insect chirping",
  "White chrysanthemum... \nbefore that\nperfect flower\nScissors hesitate",
  "At furue in rain\ngray water and\ngrey sand... \nPicture without lines",
  "The old fisherman\nunalterably\nintent... \nCold evening rain",
  "Rainy-month, dripping\non and on\nas I lie abed... \nAh, old man's memories!",
  "Slanting lines of rain... \non the dusty\nsamisen\nA mouse is trotting",
  "Old weary willows... \nI thought how long\nthe road would be\nWhen you went away"
]

def get_post_title(post)
  return post.split("\n").first.gsub('.', '').gsub('-', '').gsub(',', '')
end

kobayashis_posts.each do |post|
  Post.create(title: get_post_title(post), content: post, user: kobayashi)
end

matsuos_posts.each do |post|
  Post.create(title: get_post_title(post), content: post, user: matsuo)
end

yosas_posts.each do |post|
  Post.create(title: get_post_title(post), content: post, user: yosa)
end

comment_strings = [
  "A powerful argument!",
  "I commend you for your quick thinking.",
  "A splendid job!",
  "I commend you for your thorough work.",
  "A well-developed theme!",
  "I knew you could do it!",
  "An A-1 paper!",
  "I like how you've tackled this assignment.",
  "Appreciated",
  "I like the way you're working.",
  "Astounding",
  "I like the way you've handled this.",
  "Awesome",
  "I like the way you settle down to work.",
  "Beautiful",
  "I like your style.",
  "Bravo",
  "I love your care.",
  "Brilliant",
  "I noticed that you got right down to work.",
  "Clear, concise, and complete!",
  "Dazzling",
  "Impressive",
  "Dedicated effort",
  "In fine style",
  "Delightful",
  "Incredible",
  "Desirable",
  "It looks like you've put a lot of work into this.",
  "Distinguished",
  "Doesn't it feel good to do such a nice job?",
  "Exactly right!",
  "Keep it up.",
  "Excellent",
  "Keep up the good work.",
  "Exceptional",
  "Magnificent",
  "Exciting",
  "Majestic thoughts",
  "Exemplary",
  "Marvelous",
  "Exhilarating",
  "Meritorious",
  "Extraordinary",
  "Much better",
  "Fabulous",
  "My goodness, how impressive!",
  "Fantastic",
  "Nice going",
  "Favorable",
  "Noble",
  "Noteworthy",
  "Fine job",
  "Now you've figured it out.",
  "First-class",
  "First-rate",
  "An orderly paper",
  "Go to the head of the class.",
  "Outstanding",
  "Good for you",
  "Phenomenal",
  "Good reasoning",
  "Praiseworthy",
  "Good thinking",
  "Prestigious work",
  "Good work",
  "Good job",
  "Proper",
  "Grand job",
  "Purrrfect",
  "Great",
  "Remarkable",
  "Great going",
  "Resounding results",
  "Honorable",
  "Respectable",
  "Right on target"
]

users = [kobayashi, matsuo, yosa]

random_posts = Post.all.map{|post| post}.sample(Post.all.count / 3)
# randomly distribute comments to posts
random_posts.each do |post|
  # randomly choose between 1 and 3 users to comment on this post
  users.sample(rand(1..3)).each do |user|
    next if post.user == user
    Comment.create(text: comment_strings.sample, user: user, post: post)
  end
end

random_comments = Comment.all.map{|comment| comment}.sample(Comment.all.count / 3)
# randomly distribute reactions to comments
random_comments.each do |comment|
  # randomly choose between 1 and 3 users to react to this post
  users.sample(rand(1..3)).each do |user|
    next if comment.user == user
    Reaction.create(reaction_type: ['like', 'smile', 'thumbs_up'].sample, user: user, comment: comment)
  end
end