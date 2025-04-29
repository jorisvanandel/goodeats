import GuestLayout from '@/layouts/guest-layout';

export default function PrivacyPolicyPage() {
    return (
        <GuestLayout title="Privacyverklaring">
            <div className="px-4 py-8 space-y-3 text-text [&>h1]:text-2xl [&>h1]:font-semibold [&>h2]:text-xl [&>h2]:font-semibold [&>ul]:list-disc [&>ul]:list-inside [&_a]:text-link">
                <h1>Privacyverklaring GoodEats</h1>

                <p>Deze privacyverklaring is van toepassing op de webapplicatie <strong>GoodEats</strong>, een
                    handelsnaam van Andelwebsolutions, gevestigd in Nederland. Wij hechten veel waarde aan de
                    bescherming van jouw persoonsgegevens en verwerken deze uitsluitend volgens de Algemene Verordening
                    Gegevensbescherming (AVG).</p>

                <h2>1. Welke gegevens verzamelen wij?</h2>
                <p>Wij verwerken de volgende persoonsgegevens wanneer je een account aanmaakt of gebruikt maakt van onze
                    dienst:</p>
                <ul>
                    <li>Naam</li>
                    <li>E-mailadres</li>
                    <li>Gebruikersnaam</li>
                    <li>Profielfoto (indien van toepassing)</li>
                    <li>Wachtwoord (indien van toepassing)</li>
                </ul>

                <h2>2. Waarom verzamelen wij deze gegevens?</h2>
                <p>Wij gebruiken jouw gegevens uitsluitend voor:</p>
                <ul>
                    <li>Het aanmaken van een account</li>
                    <li>Het correct laten functioneren van de applicatie</li>
                </ul>
                <p>Wij verwerken alleen de gegevens die strikt noodzakelijk zijn voor deze doeleinden.</p>

                <h2>3. Grondslag voor gegevensverwerking</h2>
                <p>Wij verwerken jouw gegevens op basis van:</p>
                <ul>
                    <li>Uitvoering van een overeenkomst (artikel 6 lid 1b AVG): om jou toegang te geven tot je account
                        en functionaliteiten van GoodEats.
                    </li>
                </ul>

                <h2>4. Delen van gegevens met derden</h2>
                <p>Wij delen jouw persoonsgegevens niet met derden. Alle gegevens worden uitsluitend intern
                    gebruikt.</p>

                <h2>5. Opslaglocatie</h2>
                <p>Alle gegevens worden opgeslagen op servers van Amazon Web Services (AWS) in Frankfurt, Duitsland
                    (EU).</p>

                <h2>6. Bewaartermijn</h2>
                <p>Wij bewaren je gegevens zolang je account actief is. Indien je één jaar niet hebt ingelogd, of je
                    account zelf verwijdert, worden jouw persoonsgegevens verwijderd.</p>

                <h2>7. Jouw rechten</h2>
                <p>Je hebt onder de AVG de volgende rechten:</p>
                <ul>
                    <li>Recht op inzage in jouw gegevens</li>
                    <li>Recht op correctie of verwijdering</li>
                    <li>Recht op beperking van de verwerking</li>
                    <li>Recht op overdraagbaarheid van gegevens</li>
                    <li>Recht om bezwaar te maken tegen verwerking</li>
                </ul>
                <p>Voor het uitoefenen van deze rechten kun je contact met ons opnemen via:<br />
                    📧 <a href="mailto:info@andelwebsolutions.nl">info@andelwebsolutions.nl</a></p>

                <h2>8. Beveiliging</h2>
                <p>Wij nemen passende technische en organisatorische maatregelen om jouw gegevens te beveiligen tegen
                    verlies of onrechtmatige verwerking.</p>

                <h2>9. Wijzigingen</h2>
                <p>Wij behouden ons het recht voor om deze privacyverklaring aan te passen. De meest recente versie is
                    altijd beschikbaar via de applicatie.</p>
            </div>
        </GuestLayout>
    );
}
