<?php

/**
 * PHP version 7.4
 * src/Entity/User.php
 */

namespace TDW\ACiencia\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;
use OutOfRangeException;

/**
 * @ORM\Entity()
 * @ORM\Table(
 *     name                 = "user",
 *     uniqueConstraints    = {
 *          @ORM\UniqueConstraint(
 *              name="IDX_UNIQ_USERNAME", columns={ "username" }
 *          ),
 *          @ORM\UniqueConstraint(
 *              name="IDX_UNIQ_EMAIL", columns={ "email" }
 *          )
 *      }
 *     )
 */
class User implements JsonSerializable
{
    /**
     * @ORM\Column(
     *     name="id",
     *     type="integer",
     *     nullable=false
     *     )
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected int $id;

    /**
     * @ORM\Column(
     *     name     = "username",
     *     type     = "string",
     *     length   = 32,
     *     unique   = true,
     *     nullable = false
     *     )
     */
    private string $username;

    /**
     * @ORM\Column(
     *     name     = "email",
     *     type     = "string",
     *     length   = 60,
     *     nullable = true,
     *     unique   = true
     *     )
     */
    private ?string $email =  null;

    /**
     * @ORM\Column(
     *     name     = "password",
     *     type     = "string",
     *     length   = 60,
     *     nullable = false
     *     )
     */
    private string $password;

    /**
     * @ORM\Column(
     *     name="role",
     *     type="object"
     *     )
     */
    private Role $role;
    /**
     * @ORM\Column(
     *     name="status",
     *     type="boolean",
     *     nullable=false,
     *     options = {"default" : 1 }
     *     )
     */
    private bool $status;

        /**
     * @ORM\Column(
     *     name="birthdate",
     *     type="datetime",
     *     nullable=true
     *     )
     */
    private ?DateTime $birthDate = null;

    /**
     * @return bool|int
     */
    public function getApproved()
    {
        return $this->approved;
    }

    /**
     * @return bool|int
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @return DateTime|null
     */
    public function getBirthDate(): ?DateTime
    {
        return $this->birthDate;
    }

    /**
     * @param DateTime|null $birthDate
     */
    public function setBirthDate(?DateTime $birthDate): void
    {
        $this->birthDate = $birthDate;
    }

    /**
     * @param bool|int $approved
     */
    public function setApproved($approved): void
    {
        $this->approved = $approved;
    }

    /**
     * @return bool
     */
    public function isStatus(): bool
    {
        return $this->status;
    }

    /**
     * @param bool $status
     */
    public function setStatus(bool $status): void
    {
        $this->status = $status;
    }
    /**
     * @ORM\Column(
     *     name="approved",
     *     type="boolean",
     *     nullable=false,
     *     options = {"default" : 0 }
     *     )
     */
    private bool $approved;

    /**
     * User constructor.
     *
     * @param string $username username
     * @param string $email email
     * @param string $password password
     * @param string $role Role::ROLE_READER | Role::ROLE_WRITER
     */
    public function __construct(
        string $username = '',
        string $password = '',
        string $role = Role::ROLE_READER
    ) {
        $this->id       = 0;
        $this->username = $username;
        $this->email    = $username;
        $this->setPassword($password);
        $this->role     = new Role($role);
        $this->status   = 1;
        $this->approved = 0;
        $this->birthDate = null;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Get username
     *
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * Set username
     *
     * @param string $username username
     * @return User
     */
    public function setUsername(string $username): self
    {
        $this->username = $username;
        return $this;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email email
     * @return User
     */
    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @param string $role
     * @return boolean
     */
    public function hasRole(string $role): bool
    {
        return $this->role->hasRole($role);
    }

    /**
     * @param string $role [ 'ROLE_READER' | 'ROLE_WRITER' ]
     * @throws OutOfRangeException
     * @return User
     */
    public function setRole(string $role): self
    {
        $this->role = new Role($role);
        return $this;
    }

    /**
     * @return array ['reader'] | ['reader', 'writer']
     */
    public function getRoles(): array
    {
        $roles = array_filter(
            Role::ROLES,
            fn($myRole) => $this->hasRole($myRole)
        );

        return $roles;
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * @param string $password password
     * @return User
     */
    public function setPassword(string $password): self
    {
        $this->password = (string) password_hash($password, PASSWORD_DEFAULT);
        return $this;
    }

    /**
     * Verifies that the given hash matches the user password.
     *
     * @param string $password password
     * @return boolean
     */
    public function validatePassword($password): bool
    {
        return password_verify($password, $this->password);
    }

    /**
     * The __toString method allows a class to decide how it will react when it is converted to a string.
     *
     * @return string
     * @link http://php.net/manual/en/language.oop5.magic.php#language.oop5.magic.tostring
     */
    public function __toString(): string
    {
        return '[' . basename(get_class($this)) . ' ' .
            '(id=' . $this->getId() . ', ' .
            'username="' . $this->getUsername() . '", ' .
            'email="' . $this->getEmail() . '", ' .
            'role="' . $this->role .
            '")]';
    }

    /**
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    public function jsonSerialize()
    {
        return [
            'user' => [
                'id' => $this->getId(),
                'username' => $this->getUsername(),
                'email' => $this->getEmail(),
                'role' => $this->role->__toString(),
                'status' => $this->getStatus(),
                'approved' => $this->getApproved(),
                'birthDate' => $this->getBirthDate()
            ]
        ];
    }
}
