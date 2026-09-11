// ============================================================================
// CHAT-ASSISTANT VARIANTS — shared by index.html (patient chat) and
// sessions.html (provider dashboard). Loaded as a classic <script>, so the
// top-level names below are globals for the page scripts that follow.
//
// A variant is an audience-specific version of the assistant:
//   general     – the original HPV assistant
//   postpartum  – HPV assistant for patients who recently gave birth
//
// Open a specific one with  index.html?variant=general  or  ?variant=postpartum.
// Without the parameter, the disclaimer screen asks which one to use.
//
// Keys MUST match VARIANTS in the backend's variants.py — the backend uses the
// key to pick the prompt and the folder the conversation is saved to.
//
// Per-variant fields:
//   label             {en, es} name on the chooser and the dashboard switcher
//   description       {en, es} one-line explanation under the label (chooser)
//   ui                {en, es} overrides for keys of `translations` in
//                     index.html — list only what differs from the general text
//   starterQuestions  starter pills, each { title, action, defaultAnswer,
//                     followups } with {en, es} values; follow-ups have the same
//                     shape per language. defaultAnswer is rendered as Markdown.
// ============================================================================

const HPV_VARIANTS = {
    general: {
        key: 'general',
        label: { en: 'General HPV', es: 'VPH general' },
        description: {
            en: 'Questions about HPV and the HPV vaccine',
            es: 'Preguntas sobre el VPH y la vacuna contra el VPH'
        },
        ui: { en: {}, es: {} },
        starterQuestions: [
            {
                title: {
                    en: "What is HPV?",
                    es: "¿Qué es el VPH?"
                },
                action: {
                    en: "What is HPV?",
                    es: "¿Qué es el VPH?"
                },
                defaultAnswer: {
                    en: "HPV (Human Papillomavirus) is a group of related viruses, some of which can cause warts or lead to certain cancers.",
                    es: "El VPH (Virus del Papiloma Humano) es un grupo de virus relacionados, algunos de los cuales pueden causar verrugas o provocar ciertos cánceres."
                },
                followups: {
                    en: [
                        { title: "How common is HPV?", action: "How common is HPV?", defaultAnswer: "HPV infection is the most common sexually transmitted infection (STI) in the United States. Most people who have sex will get an HPV infection at some point in their lives." },
                        { title: "How is it passed from one person to another?", action: "How is it passed from one person to another?", defaultAnswer: "There are about 40 types of HPV that typically infect the genitals. It is spread by skin-to-skin contact during vaginal, anal, or oral sex. You can get a HPV infection even if you do not have sexual intercourse." },
                        { title: "What are symptoms of HPV infection?", action: "What are symptoms of HPV infection?", defaultAnswer: "HPV infection often has no signs or symptoms. People with HPV infection usually do not know they have it. This is one reason why HPV spreads easily. Some types of HPV can cause genital warts, which are growths on the outside or inside of the vagina or penis. When HPV infections last longer, they can turn into cancer." },
                        { title: "Can HPV infections be treated?", action: "Can HPV infections be treated?", defaultAnswer: "HPV infections are usually slow. In most people, the immune system clears the body of HPV before it causes disease.  Warts can be removed with medication or surgery. " }
                    ],
                    es: [
                        { title: "¿Qué tan común es el VPH?", action: "¿Qué tan común es el VPH?", defaultAnswer: "La infección por VPH es la infección de transmisión sexual más común en los Estados Unidos. La mayoría de las personas que tienen relaciones sexuales contraerán una infección por VPH en algún momento de sus vidas." },
                        { title: "¿Cómo se transmite de una persona a otra?", action: "¿Cómo se transmite de una persona a otra?", defaultAnswer: "Hay alrededor de 40 tipos de VPH que típicamente infectan los genitales. Se transmite a través del contacto piel con piel durante las relaciones sexuales vaginales, anales u orales. Puede contraer una infección por VPH incluso sin tener relaciones sexuales." },
                        { title: "¿Cuáles son los síntomas de la infección por VPH?", action: "¿Cuáles son los síntomas de la infección por VPH?", defaultAnswer: "La infección por VPH a menudo no tiene signos o síntomas. Las personas con infección por VPH generalmente no saben que la tienen. Algunos tipos de VPH pueden causar verrugas genitales. Cuando las infecciones por VPH persisten, pueden convertirse en cáncer." },
                        { title: "¿Se pueden tratar las infecciones por VPH?", action: "¿Se pueden tratar las infecciones por VPH?", defaultAnswer: "Las infecciones por VPH generalmente son lentas. En la mayoría de las personas, el sistema inmunológico elimina el VPH del cuerpo antes de que cause enfermedad. Las verrugas se pueden extirpar con medicamentos o cirugía." }
                    ]
                }
            },
            {
                title: {
                    en: "How can I protect against HPV?",
                    es: "¿Cómo puedo protegerme contra el VPH?"
                },
                action: {
                    en: "How can I protect against HPV?",
                    es: "¿Cómo puedo protegerme contra el VPH?"
                },
                defaultAnswer: {
                    en: "HPV infection can be reduced by vaccination, practicing safe sex, and regular health screenings.",
                    es: "La infección por VPH se puede reducir mediante la vacunación, practicando sexo seguro y exámenes de salud regulares."
                },
                followups: {
                    en: [
                        { title: "Is the HPV vaccine safe?", action: "Is the HPV vaccine safe?", defaultAnswer: "Yes, the HPV vaccine is a safe vaccine. Millions of people around the world have gotten the HPV vaccine without serious side effects. The vaccine does not contain live viruses, so it cannot cause an HPV infection." },
                        { title: "Is the HPV vaccine effective?", action: "Is the HPV vaccine effective?", defaultAnswer: "Yes, the HPV vaccine is an effective way to protect yourself against HPV-related diseases. It is most effective when given before a person has sex but still works if you have already had sex. The vaccine can reduce the risk of HPV-related genital warts and cancer by up to 99 percent when all recommended shots have been given. It is one of the most effective vaccines you can get." },
                        { title: "When should people get the HPV vaccine?", action: "When should people get the HPV vaccine?", defaultAnswer: "Vaccination works best when it is done before a person is sexually active and exposed to HPV. But vaccination can still reduce the risk of getting HPV for people who have already been sexually active. The ideal age for HPV vaccination of girls and boys is 11 or 12, but you can get it starting at age 9 and through age 46." },
                        { title: "What are the side effects of the HPV vaccine?", action: "What are the side effects of the HPV vaccine?", defaultAnswer: "The most common side effect of the HPV vaccine is soreness and redness where the shot is given. There have been no reports of severe side effects or bad reactions to the vaccine." }
                    ],
                    es: [
                        { title: "¿Es segura la vacuna contra el VPH?", action: "¿Es segura la vacuna contra el VPH?", defaultAnswer: "Sí, la vacuna contra el VPH es segura. Millones de personas en todo el mundo han recibido la vacuna sin efectos secundarios graves. La vacuna no contiene virus vivos, por lo que no puede causar una infección por VPH." },
                        { title: "¿Es efectiva la vacuna contra el VPH?", action: "¿Es efectiva la vacuna contra el VPH?", defaultAnswer: "Sí, la vacuna contra el VPH es una forma efectiva de protegerse contra enfermedades relacionadas con el VPH. Es más efectiva cuando se administra antes de que una persona tenga relaciones sexuales, pero aún funciona si ya ha tenido relaciones sexuales. La vacuna puede reducir el riesgo de verrugas genitales relacionadas con el VPH y cáncer hasta en un 99 por ciento." },
                        { title: "¿Cuándo deben las personas recibir la vacuna contra el VPH?", action: "¿Cuándo deben las personas recibir la vacuna contra el VPH?", defaultAnswer: "La vacunación funciona mejor cuando se realiza antes de que una persona sea sexualmente activa y esté expuesta al VPH. Pero la vacunación aún puede reducir el riesgo de contraer VPH para personas que ya han sido sexualmente activas. La edad ideal para la vacunación contra el VPH en niñas y niños es 11 o 12 años, pero se puede recibir a partir de los 9 años y hasta los 46 años." },
                        { title: "¿Cuáles son los efectos secundarios de la vacuna contra el VPH?", action: "¿Cuáles son los efectos secundarios de la vacuna contra el VPH?", defaultAnswer: "El efecto secundario más común de la vacuna contra el VPH es dolor y enrojecimiento donde se administra la inyección. No ha habido reportes de efectos secundarios graves o reacciones adversas a la vacuna." }
                    ]
                }
            },
            {
                title: {
                    en: "Why should I be worried about HPV?",
                    es: "¿Por qué debería preocuparme por el VPH?"
                },
                action: {
                    en: "Why should I be worried about HPV?",
                    es: "¿Por qué debería preocuparme por el VPH?"
                },
                defaultAnswer: {
                    en: "HPV is a common sexually transmitted infection that can lead to serious health issues, including certain cancers.",
                    es: "El VPH es una infección de transmisión sexual común que puede provocar problemas de salud graves, incluidos ciertos cánceres."
                },
                followups: {
                    en: [
                        { title: "When can HPV infection cause cancer?", action: "When can HPV infection cause cancer?", defaultAnswer: "The immune system fights most HPV infections and clears them from the body, usually within 2 years. But sometimes HPV infections can last longer. A longer infection with a “high-risk” HPV type can turn into cancer. It usually takes years for this to happen." },
                        { title: "How long does cervical cancer take to develop?", action: "How long does cervical cancer take to develop?", defaultAnswer: "It can take 3 to 7 years for certain changes in the cells on the cervix to become cancer. The purpose of Pap Smears is to detect these changes while they are still easily treated." },
                        { title: "Can I get the HPV vaccine if I've already had an infection or cancer?", action: "Can I get the HPV vaccine if I've already had an infection or cancer?", defaultAnswer: "Yes, the HPV vaccine may help prevent abnormal cells from coming back after treatment. If HPV infection leads to severe abnormal cells on the cervix, treatment also involves removing or destroying those cells." }
                    ],
                    es: [
                        { title: "¿Cuándo puede la infección por VPH causar cáncer?", action: "¿Cuándo puede la infección por VPH causar cáncer?", defaultAnswer: "El sistema inmunológico combate la mayoría de las infecciones por VPH y las elimina del cuerpo, generalmente en 2 años. Pero a veces las infecciones por VPH pueden durar más tiempo. Una infección más prolongada con un tipo de VPH de \"alto riesgo\" puede convertirse en cáncer. Generalmente esto tarda años en suceder." },
                        { title: "¿Cuánto tiempo tarda en desarrollarse el cáncer de cuello uterino?", action: "¿Cuánto tiempo tarda en desarrollarse el cáncer de cuello uterino?", defaultAnswer: "Pueden pasar 3 a 7 años para que ciertos cambios en las células del cuello uterino se conviertan en cáncer. El propósito de las pruebas de Papanicolaou es detectar estos cambios mientras aún se pueden tratar fácilmente." },
                        { title: "¿Puedo recibir la vacuna contra el VPH si ya he tenido una infección o cáncer?", action: "¿Puedo recibir la vacuna contra el VPH si ya he tenido una infección o cáncer?", defaultAnswer: "Sí, la vacuna contra el VPH puede ayudar a prevenir que las células anormales vuelvan después del tratamiento. Si la infección por VPH causa células anormales graves en el cuello uterino, el tratamiento también implica extirpar o destruir esas células." }
                    ]
                }
            },
            {
                title: {
                    en: "Do I still need Pap smears if I had the HPV vaccine?",
                    es: "¿Todavía necesito pruebas de Papanicolaou si me vacuné contra el VPH?"
                },
                action: {
                    en: "Do I still need Pap smears if I had the HPV vaccine?",
                    es: "¿Todavía necesito pruebas de Papanicolaou si me vacuné contra el VPH?"
                },
                defaultAnswer: {
                    en: "Yes, even if you have had the HPV vaccine, regular Pap smears are still recommended to screen for cervical cancer.",
                    es: "Sí, incluso si se ha vacunado contra el VPH, aún se recomiendan las pruebas de Papanicolaou regulares para detectar el cáncer de cuello uterino."
                },
                followups: {
                    en: [
                        { title: "How do we screen/check for cervical cancer?", action: "How do we screen/check for cervical cancer?", defaultAnswer: "Cervical cancer screening includes the Pap test, an HPV test, or both. Both tests use cells taken from the cervix. " },
                        { title: "When should I be tested for HPV?", action: "When should I be tested for HPV?", defaultAnswer: "You should start having Pap smears at age 21, regardless of when you first start having sex. Usually HPV is tested starting age 30, unless your Pap smear is abnormal before that. How often you should have screening and which tests you should have depend on your age and health history." }
                    ],
                    es: [
                        { title: "¿Cómo se detecta o examina el cáncer de cuello uterino?", action: "¿Cómo se detecta o examina el cáncer de cuello uterino?", defaultAnswer: "El cáncer de cuello uterino se detecta mediante pruebas de Papanicolaou, pruebas de VPH o ambas. Ambas pruebas utilizan células tomadas del cuello uterino." },
                        { title: "¿Cuándo debo hacerme la prueba del VPH?", action: "¿Cuándo debo hacerme la prueba del VPH?", defaultAnswer: "Debe comenzar a hacerse pruebas de Papanicolaou a los 21 años, independientemente de cuándo comience a tener relaciones sexuales. Generalmente, las pruebas de VPH comienzan a los 30 años, a menos que su prueba de Papanicolaou sea anormal antes. La frecuencia depende de su edad e historial de salud." }
                    ]
                }
            }
        ]
    },
    postpartum: {
        key: 'postpartum',
        label: { en: 'Post-partum HPV', es: 'VPH después del parto' },
        description: {
            en: 'For patients who recently had a baby',
            es: 'Para pacientes que tuvieron un bebé recientemente'
        },
        ui: {
            en: {
                subtitle: 'HPV information for after you have your baby',
                emptyTitle: 'Welcome! I can answer your questions about HPV and the HPV vaccine after having a baby.'
            },
            es: {
                subtitle: 'Información sobre el VPH después de tener a su bebé',
                emptyTitle: '¡Le damos la bienvenida! Puedo responder sus preguntas sobre el VPH y la vacuna contra el VPH después de tener a su bebé.'
            }
        },
        starterQuestions: [
            {
                title: {
                    en: "What is HPV?",
                    es: "¿Qué es el VPH?"
                },
                action: {
                    en: "What is HPV?",
                    es: "¿Qué es el VPH?"
                },
                defaultAnswer: {
                    en: "HPV (Human Papillomavirus) is a group of related viruses, some of which can cause warts or lead to certain cancers.",
                    es: "El VPH (Virus del Papiloma Humano) es un grupo de virus relacionados, algunos de los cuales pueden causar verrugas o provocar ciertos cánceres."
                },
                followups: {
                    en: [
                        { title: "How common is HPV?", action: "How common is HPV?", defaultAnswer: "HPV is very common. It is the most common sexually transmitted infection (STI) in the United States. Most people who have sex will get HPV at some point in their lives." },
                        { title: "How does HPV spread?", action: "How does HPV spread?", defaultAnswer: "HPV spreads through skin-to-skin contact during vaginal, anal, or oral sex. You can get HPV even if you do not have sexual intercourse." },
                        { title: "What are the signs of HPV?", action: "What are the signs of HPV?", defaultAnswer: "- Most people with HPV have no signs or symptoms. They may not know they have it. This is one reason HPV spreads easily.\n- Some types of HPV can cause warts. These are small growths that can appear on or around the vagina or penis.\n- Some types of HPV can cause cancer if the infection stays in the body for a long time." },
                        { title: "Can HPV be treated?", action: "Can HPV be treated?", defaultAnswer: "- Most of the time, your body gets rid of HPV on its own. Your immune system fights the virus.\n- There is no medicine that gets rid of HPV itself. But doctors can treat problems caused by HPV, such as genital warts." }
                    ],
                    es: [
                        { title: "¿Qué tan común es el VPH?", action: "¿Qué tan común es el VPH?", defaultAnswer: "El VPH es muy común. Es la infección de transmisión sexual (ITS) más común en los Estados Unidos. La mayoría de las personas que tienen relaciones sexuales tendrán el VPH en algún momento de su vida." },
                        { title: "¿Cómo se transmite el VPH?", action: "¿Cómo se transmite el VPH?", defaultAnswer: "El VPH se transmite por contacto de piel con piel durante las relaciones sexuales vaginales, anales u orales. Puede contraer el VPH aunque no tenga relaciones sexuales con penetración." },
                        { title: "¿Cuáles son las señales del VPH?", action: "¿Cuáles son las señales del VPH?", defaultAnswer: "- La mayoría de las personas con VPH no tienen señales ni síntomas. Es posible que no sepan que lo tienen. Esta es una de las razones por las que el VPH se transmite fácilmente.\n- Algunos tipos de VPH pueden causar verrugas. Son pequeños bultos que pueden aparecer en la vagina o el pene, o a su alrededor.\n- Algunos tipos de VPH pueden causar cáncer si la infección se queda en el cuerpo por mucho tiempo." },
                        { title: "¿Se puede tratar el VPH?", action: "¿Se puede tratar el VPH?", defaultAnswer: "- La mayoría de las veces, su cuerpo elimina el VPH por sí solo. Su sistema inmunológico combate el virus.\n- No hay ningún medicamento que elimine el VPH en sí. Pero los médicos pueden tratar los problemas que causa el VPH, como las verrugas genitales." }
                    ]
                }
            },
            {
                title: {
                    en: "How can I protect myself from HPV?",
                    es: "¿Cómo puedo protegerme del VPH?"
                },
                action: {
                    en: "How can I protect myself from HPV?",
                    es: "¿Cómo puedo protegerme del VPH?"
                },
                defaultAnswer: {
                    en: "HPV infection can be reduced by vaccination, practicing safe sex, and regular health screenings.",
                    es: "La infección por VPH se puede reducir mediante la vacunación, practicando sexo seguro y exámenes de salud regulares."
                },
                followups: {
                    en: [
                        { title: "Is the HPV vaccine safe?", action: "Is the HPV vaccine safe?", defaultAnswer: "- Yes. The HPV vaccine is safe. Millions of people around the world have received the vaccine.\n- The vaccine cannot give you HPV because it does not contain a live virus." },
                        { title: "Does the HPV vaccine work?", action: "Does the HPV vaccine work?", defaultAnswer: "- Yes. The HPV vaccine works very well to prevent HPV infections, genital warts, and some cancers.\n- The vaccine works best when given before a person has sex for the first time. But it can still help protect people who have already had sex.\n- When all recommended vaccine doses are given, the vaccine can lower the risk of some HPV-related diseases by up to 99%." },
                        { title: "When should people get the HPV vaccine?", action: "When should people get the HPV vaccine?", defaultAnswer: "- The vaccine works best before a person has been exposed to HPV.\n- Children should usually get the vaccine at age 11 or 12. It can be started as early as age 9.\n- People who have already had sex may still benefit from the vaccine up to age 46." },
                        { title: "Can the HPV vaccine make it harder to get pregnant?", action: "Can the HPV vaccine make it harder to get pregnant?", defaultAnswer: "- No. The HPV vaccine does not make it harder to get pregnant.\n- The vaccine is not recommended during pregnancy. However, it is safe to get after having a baby." },
                        { title: "What are the side effects of the HPV vaccine?", action: "What are the side effects of the HPV vaccine?", defaultAnswer: "- The most common side effects are pain, redness, or soreness where the shot was given.\n- Serious side effects are very rare." },
                        { title: "Will the vaccine make my recovery longer?", action: "Will the vaccine make my recovery longer?", defaultAnswer: "- No. The HPV vaccine does not slow down healing.\n- If you had a C-section or a repair after giving birth, the vaccine should not change your recovery." },
                        { title: "Can the HPV vaccine affect my mood?", action: "Can the HPV vaccine affect my mood?", defaultAnswer: "- There is no evidence that the HPV vaccine causes depression or anxiety.\n- After having a baby, changes in hormones can affect your mood. The HPV vaccine has not been shown to cause these changes." },
                        { title: "Can I breastfeed after getting the HPV vaccine?", action: "Can I breastfeed after getting the HPV vaccine?", defaultAnswer: "- Yes. You can breastfeed after getting the HPV vaccine.\n- The vaccine is considered safe for both you and your baby." }
                    ],
                    es: [
                        { title: "¿Es segura la vacuna contra el VPH?", action: "¿Es segura la vacuna contra el VPH?", defaultAnswer: "- Sí. La vacuna contra el VPH es segura. Millones de personas en todo el mundo la han recibido.\n- La vacuna no le puede dar el VPH porque no contiene virus vivos." },
                        { title: "¿Funciona la vacuna contra el VPH?", action: "¿Funciona la vacuna contra el VPH?", defaultAnswer: "- Sí. La vacuna contra el VPH funciona muy bien para prevenir infecciones por VPH, verrugas genitales y algunos cánceres.\n- La vacuna funciona mejor cuando se pone antes de tener relaciones sexuales por primera vez. Pero también puede ayudar a proteger a las personas que ya han tenido relaciones sexuales.\n- Cuando se reciben todas las dosis recomendadas, la vacuna puede reducir hasta en un 99% el riesgo de algunas enfermedades relacionadas con el VPH." },
                        { title: "¿Cuándo deben vacunarse las personas contra el VPH?", action: "¿Cuándo deben vacunarse las personas contra el VPH?", defaultAnswer: "- La vacuna funciona mejor antes de que una persona haya estado expuesta al VPH.\n- Por lo general, los niños y niñas deben recibir la vacuna a los 11 o 12 años. Se puede empezar desde los 9 años.\n- Las personas que ya han tenido relaciones sexuales todavía pueden beneficiarse de la vacuna hasta los 46 años." },
                        { title: "¿La vacuna contra el VPH puede hacer más difícil quedar embarazada?", action: "¿La vacuna contra el VPH puede hacer más difícil quedar embarazada?", defaultAnswer: "- No. La vacuna contra el VPH no hace más difícil quedar embarazada.\n- No se recomienda ponerse la vacuna durante el embarazo. Sin embargo, es seguro ponérsela después de tener a su bebé." },
                        { title: "¿Cuáles son los efectos secundarios de la vacuna contra el VPH?", action: "¿Cuáles son los efectos secundarios de la vacuna contra el VPH?", defaultAnswer: "- Los efectos secundarios más comunes son dolor, enrojecimiento o molestia donde se puso la inyección.\n- Los efectos secundarios graves son muy raros." },
                        { title: "¿La vacuna hará que mi recuperación tarde más?", action: "¿La vacuna hará que mi recuperación tarde más?", defaultAnswer: "- No. La vacuna contra el VPH no hace más lenta la sanación.\n- Si tuvo una cesárea o le hicieron puntos después del parto, la vacuna no debería cambiar su recuperación." },
                        { title: "¿La vacuna contra el VPH puede afectar mi estado de ánimo?", action: "¿La vacuna contra el VPH puede afectar mi estado de ánimo?", defaultAnswer: "- No hay pruebas de que la vacuna contra el VPH cause depresión o ansiedad.\n- Después de tener un bebé, los cambios en las hormonas pueden afectar su estado de ánimo. No se ha demostrado que la vacuna contra el VPH cause estos cambios." },
                        { title: "¿Puedo amamantar después de ponerme la vacuna contra el VPH?", action: "¿Puedo amamantar después de ponerme la vacuna contra el VPH?", defaultAnswer: "- Sí. Puede amamantar después de ponerse la vacuna contra el VPH.\n- La vacuna se considera segura para usted y para su bebé." }
                    ]
                }
            },
            {
                title: {
                    en: "Why is HPV important?",
                    es: "¿Por qué es importante el VPH?"
                },
                action: {
                    en: "Why is HPV important?",
                    es: "¿Por qué es importante el VPH?"
                },
                defaultAnswer: {
                    en: "HPV is a common sexually transmitted infection that can lead to serious health issues, including certain cancers.",
                    es: "El VPH es una infección de transmisión sexual común que puede provocar problemas de salud graves, incluidos ciertos cánceres."
                },
                followups: {
                    en: [
                        { title: "When can HPV cause cancer?", action: "When can HPV cause cancer?", defaultAnswer: "- Most HPV infections go away on their own, usually within 2 years.\n- Sometimes HPV stays in the body for a long time. Some types of HPV can cause cancer if the infection does not go away.\n- This usually takes many years." },
                        { title: "How long does it take for cervical cancer to develop?", action: "How long does it take for cervical cancer to develop?", defaultAnswer: "- It can take several years for HPV to cause changes in the cells of the cervix. Some of these changes can become cancer.\n- Pap tests help doctors find these cell changes early, when they are easier to treat." },
                        { title: "Can I get the HPV vaccine if I have already had HPV or cancer?", action: "Can I get the HPV vaccine if I have already had HPV or cancer?", defaultAnswer: "- Yes. You may still benefit from the HPV vaccine even if you have had HPV before.\n- The vaccine does not treat an HPV infection that you already have. But it may protect you from other types of HPV.\n- If HPV causes abnormal cells on the cervix, your doctor can treat or remove these cells." }
                    ],
                    es: [
                        { title: "¿Cuándo puede el VPH causar cáncer?", action: "¿Cuándo puede el VPH causar cáncer?", defaultAnswer: "- La mayoría de las infecciones por VPH desaparecen solas, por lo general en 2 años.\n- A veces el VPH se queda en el cuerpo por mucho tiempo. Algunos tipos de VPH pueden causar cáncer si la infección no desaparece.\n- Por lo general, esto tarda muchos años." },
                        { title: "¿Cuánto tiempo tarda en desarrollarse el cáncer de cuello uterino?", action: "¿Cuánto tiempo tarda en desarrollarse el cáncer de cuello uterino?", defaultAnswer: "- El VPH puede tardar varios años en causar cambios en las células del cuello uterino. Algunos de estos cambios pueden convertirse en cáncer.\n- Las pruebas de Papanicolaou ayudan a los médicos a encontrar estos cambios temprano, cuando son más fáciles de tratar." },
                        { title: "¿Puedo ponerme la vacuna contra el VPH si ya tuve VPH o cáncer?", action: "¿Puedo ponerme la vacuna contra el VPH si ya tuve VPH o cáncer?", defaultAnswer: "- Sí. La vacuna contra el VPH todavía puede beneficiarle aunque ya haya tenido el VPH.\n- La vacuna no trata una infección por VPH que ya tenga. Pero puede protegerle de otros tipos de VPH.\n- Si el VPH causa células anormales en el cuello uterino, su médico puede tratar o quitar esas células." }
                    ]
                }
            },
            {
                title: {
                    en: "Do I still need Pap tests if I had the HPV vaccine?",
                    es: "¿Todavía necesito pruebas de Papanicolaou si me vacuné contra el VPH?"
                },
                action: {
                    en: "Do I still need Pap tests if I had the HPV vaccine?",
                    es: "¿Todavía necesito pruebas de Papanicolaou si me vacuné contra el VPH?"
                },
                defaultAnswer: {
                    en: "Yes, even if you have had the HPV vaccine, regular Pap tests are still recommended to screen for cervical cancer.",
                    es: "Sí, incluso si se ha vacunado contra el VPH, aún se recomiendan las pruebas de Papanicolaou regulares para detectar el cáncer de cuello uterino."
                },
                followups: {
                    en: [
                        { title: "How do doctors check for cervical cancer?", action: "How do doctors check for cervical cancer?", defaultAnswer: "Doctors use cervical cancer screening to look for changes in the cells of the cervix. Screening can include:\n- A Pap test\n- An HPV test\n- Both tests" },
                        { title: "When should I be tested?", action: "When should I be tested?", defaultAnswer: "- Cervical cancer screening usually starts at age 21.\n- You should have screening even if you have received the HPV vaccine.\n- When you need to be tested and which test you need depends on your age and health history. Your doctor can tell you how often you should be screened." }
                    ],
                    es: [
                        { title: "¿Cómo revisan los médicos si hay cáncer de cuello uterino?", action: "¿Cómo revisan los médicos si hay cáncer de cuello uterino?", defaultAnswer: "Los médicos usan pruebas de detección del cáncer de cuello uterino para buscar cambios en las células del cuello uterino. Las pruebas pueden incluir:\n- Una prueba de Papanicolaou\n- Una prueba del VPH\n- Ambas pruebas" },
                        { title: "¿Cuándo debo hacerme las pruebas?", action: "¿Cuándo debo hacerme las pruebas?", defaultAnswer: "- Las pruebas de detección del cáncer de cuello uterino por lo general empiezan a los 21 años.\n- Debe hacerse las pruebas aunque haya recibido la vacuna contra el VPH.\n- Cuándo necesita hacerse las pruebas y cuál prueba necesita depende de su edad y su historial de salud. Su médico le puede decir con qué frecuencia debe hacerse las pruebas." }
                    ]
                }
            }
        ]
    }
};

// Return the variant registered under `key` (case-insensitive), or null.
// hasOwnProperty keeps keys like "__proto__" from matching Object internals.
function getVariant(key) {
    const k = String(key || '').trim().toLowerCase();
    return Object.prototype.hasOwnProperty.call(HPV_VARIANTS, k) ? HPV_VARIANTS[k] : null;
}

// The variant requested via ?variant=… in the page URL, or null if absent/unknown.
function variantFromUrl() {
    return getVariant(new URLSearchParams(window.location.search).get('variant'));
}

// Pick the string for `lang` from an {en, es} object (English fallback).
function localized(value, lang) {
    return (value && (value[lang] || value.en)) || '';
}
